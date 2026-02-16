import os
import pickle
from typing import List, Dict, Optional, Tuple

import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from huggingface_hub import InferenceClient

from .config import (
    FAISS_INDEX_PATH,
    DOCSTORE_PATH,
    EMBED_MODEL_NAME,
    MIN_TOP_SCORE,
    WEB_MAX_RESULTS,
    HF_TOKEN,
    HF_MODEL,
)
from .fetcher import fetch_page_text
from .web_search import web_search


class RAGEngineHF:
    def __init__(self):
        self.embedder = SentenceTransformer(EMBED_MODEL_NAME)

        # Load FAISS index + docs
        self.index = faiss.read_index(FAISS_INDEX_PATH)
        with open(DOCSTORE_PATH, "rb") as f:
            self.docs: List[Dict] = pickle.load(f)

        # Prefer config values; give safe default model if empty
        model_name = (HF_MODEL or "google/gemma-2-2b-it").strip()
        token = (HF_TOKEN or "").strip()

        self.client = InferenceClient(model=model_name, token=token)

        self.TOP_K = 5
        self.MAX_CONTEXT_CHARS_PER_DOC = 1800

    def retrieve_local(self, query: str, k: int = 5) -> List[Dict]:
        q_emb = self.embedder.encode([query], normalize_embeddings=True)
        q_emb = np.array(q_emb, dtype="float32")
        scores, ids = self.index.search(q_emb, k)

        out: List[Dict] = []
        for rank, doc_id in enumerate(ids[0]):
            if doc_id == -1:
                continue
            d = self.docs[int(doc_id)]
            out.append(
                {
                    "rank": rank + 1,
                    "score": float(scores[0][rank]),
                    "text": d.get("text", ""),
                    "meta": d.get("meta", {}),
                }
            )
        return out

    def _needs_web_fallback(self, contexts: List[Dict]) -> bool:
        return (not contexts) or (contexts[0]["score"] < MIN_TOP_SCORE)

    def fetch_web_context(self, query: str) -> Tuple[List[Dict], List[Dict]]:
        """
        Optional fallback: uses web_search() -> fetch_page_text().
        web_search() should return [] when rate-limited, so this won't crash.
        """
        queries = [f"site:foodsystemsdashboard.org {query}", query]
        links: List[Dict] = []
        seen = set()

        for q in queries:
            for r in web_search(q, max_results=WEB_MAX_RESULTS):
                url = r.get("url")
                if url and url not in seen:
                    links.append(r)
                    seen.add(url)
            if len(links) >= WEB_MAX_RESULTS:
                break

        contexts: List[Dict] = []
        sources: List[Dict] = []

        for r in links[:WEB_MAX_RESULTS]:
            try:
                page = fetch_page_text(r["url"], use_cache=True)
                contexts.append(
                    {
                        "rank": len(contexts) + 1,
                        "score": 0.0,
                        "text": page.get("text", ""),
                        "meta": {
                            "url": page.get("url", r["url"]),
                            "title": page.get("title", r.get("title", "Source")),
                            "chunk": 0,
                        },
                    }
                )
                sources.append(
                    {
                        "title": page.get("title", r.get("title", "Source")),
                        "url": page.get("url", r["url"]),
                    }
                )
            except Exception:
                continue

        return contexts, sources

    def answer(self, query: str, preferred_lang: Optional[str] = None) -> Dict:
        local = self.retrieve_local(query, k=self.TOP_K)
        used = "local"
        contexts = local
        sources = self._unique_sources(local)

        # Web fallback only if local seems weak
        if self._needs_web_fallback(local):
            web_ctx, web_src = self.fetch_web_context(query)
            if web_ctx:
                used = "web"
                contexts = web_ctx
                sources = web_src

        context_block = "\n\n".join(
            [
                f"[{i+1}] {c.get('meta', {}).get('title', 'Source')}\n{c.get('text', '')[:self.MAX_CONTEXT_CHARS_PER_DOC]}"
                for i, c in enumerate(contexts)
            ]
        )

        lang_line = f"Respond in {preferred_lang}.\n" if preferred_lang else ""

        prompt = f"""
You are the SysLink Food System assistant.
you can Answer using the information given BELOW if not GET from Web
Write in simple, clear language.
Keep responses MEDIUM length (10-20 lines).
If information is missing, say what is missing.
{lang_line}
QUESTION: {query}
INFORMATION:
{context_block}
ANSWER:
""".strip()

        # If token missing, we can still try public inference,
        # but failures are common; return a helpful message.
        token = (HF_TOKEN or "").strip()
        if not token:
            return {
                "answer": "I’m running without an HF_TOKEN right now, so the AI response may fail. Please add HF_TOKEN in Space Settings → Secrets, then retry.",
                "sources": sources,
                "used": used,
            }

        # Try chat completion (works for conversational providers)
        try:
            messages = [
                {"role": "system", "content": "You are the SysLink Food System assistant."},
                {"role": "user", "content": prompt},
            ]
            resp = self.client.chat_completion(
                messages=messages,
                max_tokens=250,
                temperature=0.2,
            )
            out = (resp.choices[0].message.content or "").strip()
        except Exception as e:
            # Fallback: return a visible error message (so you can debug)
            out = f"Model error: {str(e)}"

        if not out:
            out = "I couldn’t generate an answer right now. Please try again."

        return {"answer": out, "sources": sources, "used": used}

    def _unique_sources(self, contexts: List[Dict]) -> List[Dict]:
        seen, out = set(), []
        for c in contexts:
            meta = c.get("meta", {})
            u = meta.get("url")
            if u and u not in seen:
                out.append({"title": meta.get("title", "Source"), "url": u})
                seen.add(u)
        return out