# backend/app/rag.py
import os
import pickle
from typing import List, Dict, Tuple, Optional

import numpy as np
import faiss
import requests
from sentence_transformers import SentenceTransformer

from .config import (
    FAISS_INDEX_PATH,
    DOCSTORE_PATH,
    EMBED_MODEL_NAME,
    MIN_TOP_SCORE,
    WEB_MAX_RESULTS,
    OLLAMA_BASE_URL,
    OLLAMA_MODEL,
)
from .fetcher import fetch_page_text
from .web_search import web_search


class RAGEngine:
    def __init__(self):
        if not os.path.exists(FAISS_INDEX_PATH) or not os.path.exists(DOCSTORE_PATH):
            raise FileNotFoundError(
                "Missing FAISS index/docs. Run ingestion first: python -m app.ingest"
            )

        self.embedder = SentenceTransformer(EMBED_MODEL_NAME)
        self.index = faiss.read_index(FAISS_INDEX_PATH)

        with open(DOCSTORE_PATH, "rb") as f:
            self.docs: List[Dict] = pickle.load(f)

        # Tunings for speed
        self.TOP_K = 5
        self.MAX_CONTEXT_CHARS_PER_DOC = 2000  # keep prompt small -> faster
        self.MAX_WEB_PAGES = WEB_MAX_RESULTS

    # ---------- Retrieval ----------
    def retrieve_local(self, query: str, k: int = 5) -> List[Dict]:
        q_emb = self.embedder.encode([query], normalize_embeddings=True)
        q_emb = np.array(q_emb, dtype="float32")

        scores, ids = self.index.search(q_emb, k)

        results = []
        for rank, doc_id in enumerate(ids[0]):
            if doc_id == -1:
                continue
            d = self.docs[int(doc_id)]
            results.append({
                "rank": rank + 1,
                "score": float(scores[0][rank]),
                "text": d["text"],
                "meta": d["meta"],
            })
        return results

    def _needs_web_fallback(self, contexts: List[Dict]) -> bool:
        if not contexts:
            return True
        return contexts[0]["score"] < MIN_TOP_SCORE

    # ---------- Web fallback ----------
    def fetch_web_context(self, query: str) -> Tuple[List[Dict], List[Dict]]:
        """
        Search web and fetch a few pages. Returns (contexts, sources).
        """
        # Prefer your key domain first (still "web", but targeted)
        queries = [
            f"site:foodsystemsdashboard.org {query}",
            query,
        ]

        links: List[Dict] = []
        seen = set()

        for q in queries:
            for r in web_search(q, max_results=self.MAX_WEB_PAGES):
                if r["url"] not in seen:
                    links.append(r)
                    seen.add(r["url"])
            if len(links) >= self.MAX_WEB_PAGES:
                break

        contexts = []
        sources = []

        for r in links[: self.MAX_WEB_PAGES]:
            try:
                page = fetch_page_text(r["url"], use_cache=True)
                contexts.append({
                    "rank": len(contexts) + 1,
                    "score": 0.0,
                    "text": page["text"],
                    "meta": {"url": page["url"], "title": page["title"], "chunk": 0},
                })
                sources.append({"title": page["title"], "url": page["url"]})
            except Exception:
                continue

        return contexts, sources

    # ---------- Ollama generation ----------
    def _ollama_generate(self, prompt: str) -> str:
        """
        Calls local Ollama (FREE).
        """
        payload = {
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False,
        }
        resp = requests.post(f"{OLLAMA_BASE_URL}/api/generate", json=payload, timeout=120)
        resp.raise_for_status()
        data = resp.json()
        return (data.get("response") or "").strip()

    # ---------- Public: answer ----------
    def answer(self, query: str, preferred_lang: Optional[str] = None) -> Dict:
        local_contexts = self.retrieve_local(query, k=self.TOP_K)

        used = "local"
        contexts = local_contexts
        sources = self._unique_sources_from_local(local_contexts)

        # If local is weak -> web fallback
        if self._needs_web_fallback(local_contexts):
            web_contexts, web_sources = self.fetch_web_context(query)
            if web_contexts:
                used = "web"
                contexts = web_contexts
                sources = web_sources

        # Build compact context for speed
        context_block = "\n\n".join(
            [
                f"[{i+1}] {c['meta']['title']}\n{c['text'][: self.MAX_CONTEXT_CHARS_PER_DOC]}"
                for i, c in enumerate(contexts)
            ]
        )

        lang_line = ""
        if preferred_lang:
            lang_line = f"\n- Respond in this language: {preferred_lang}\n"

        prompt = f"""
You are a helpful assistant for "SysLink Food System".
RULES:
- Answer ONLY using the context below. Do not invent facts.
- Use simple language and a MEDIUM length response (about 8–14 lines).
- If the context is not enough, say what is missing and what page/type of info is needed.
{lang_line}
QUESTION:
{query}

CONTEXT:
{context_block}

Now write the answer:
""".strip()

        answer_text = self._ollama_generate(prompt)

        # Safety: if model returns empty, fallback message
        if not answer_text:
            answer_text = (
                "I couldn’t generate a reliable answer from the available information. "
                "Please rephrase your question or provide more details."
            )

        return {
            "answer": answer_text,
            "sources": sources,
            "used": used,
        }

    def _unique_sources_from_local(self, contexts: List[Dict]) -> List[Dict]:
        seen = set()
        out = []
        for c in contexts:
            u = c["meta"]["url"]
            if u not in seen:
                out.append({"title": c["meta"]["title"], "url": u})
                seen.add(u)
        return out