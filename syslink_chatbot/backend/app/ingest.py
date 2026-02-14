import os
import json
import pickle
from typing import List, Dict

import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

from .config import (
    DATA_DIR,
    URLS_PATH,
    FAISS_INDEX_PATH,
    DOCSTORE_PATH,
    EMBED_MODEL_NAME,
)
from .fetcher import fetch_page_text


def ensure_data_dir():
    os.makedirs(DATA_DIR, exist_ok=True)


def load_urls() -> List[str]:
    """
    Expects data/urls.json like:
    {
      "urls": ["https://...", "https://..."]
    }
    """
    if not os.path.exists(URLS_PATH):
        raise FileNotFoundError(
            f"Missing {URLS_PATH}. Create it with your 4 URLs."
        )
    with open(URLS_PATH, "r", encoding="utf-8") as f:
        obj = json.load(f)
    urls = obj.get("urls", [])
    if not urls:
        raise ValueError("urls.json has no URLs. Add at least 1 URL.")
    return urls


def chunk_text(text: str, chunk_size_words: int = 900, overlap_words: int = 150) -> List[str]:
    """
    Simple word-based chunking (fast + reliable).
    """
    words = text.split()
    chunks = []
    i = 0
    step = max(1, chunk_size_words - overlap_words)

    while i < len(words):
        chunk = words[i:i + chunk_size_words]
        chunks.append(" ".join(chunk))
        i += step

    return chunks


def build_docs_from_urls(urls: List[str]) -> List[Dict]:
    docs: List[Dict] = []
    for url in urls:
        page = fetch_page_text(url, use_cache=True)
        chunks = chunk_text(page["text"])

        for idx, ch in enumerate(chunks):
            docs.append({
                "text": ch,
                "meta": {
                    "url": page["url"],
                    "title": page["title"],
                    "chunk": idx
                }
            })
    return docs


def build_faiss_index(docs: List[Dict]) -> None:
    model = SentenceTransformer(EMBED_MODEL_NAME)

    texts = [d["text"] for d in docs]
    emb = model.encode(texts, normalize_embeddings=True, show_progress_bar=True)
    emb = np.array(emb, dtype="float32")

    index = faiss.IndexFlatIP(emb.shape[1])
    index.add(emb)

    faiss.write_index(index, FAISS_INDEX_PATH)

    with open(DOCSTORE_PATH, "wb") as f:
        pickle.dump(docs, f)


def run_ingestion():
    ensure_data_dir()
    urls = load_urls()
    docs = build_docs_from_urls(urls)

    if not docs:
        raise RuntimeError("No documents created from URLs. Check your URLs/pages.")

    build_faiss_index(docs)

    print("✅ Ingestion complete")
    print(f"URLs: {len(urls)}")
    print(f"Chunks: {len(docs)}")
    print(f"Saved index: {FAISS_INDEX_PATH}")
    print(f"Saved docs:  {DOCSTORE_PATH}")


if __name__ == "__main__":
    run_ingestion()