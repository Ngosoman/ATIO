import os
import json
import pickle
from typing import List, Dict, Tuple

import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from pypdf import PdfReader

from .config import (
    DATA_DIR,
    URLS_PATH,
    FAISS_INDEX_PATH,
    DOCSTORE_PATH,
    EMBED_MODEL_NAME,
)
from .fetcher import fetch_page_text


DOCS_DIR = os.path.join(DATA_DIR, "docs")


def ensure_data_dir():
    os.makedirs(DATA_DIR, exist_ok=True)
    os.makedirs(DOCS_DIR, exist_ok=True)  # safe even if empty


def load_urls() -> List[str]:
    """
    Expects data/urls.json like:
    { "urls": ["https://...", "https://..."] }
    """
    if not os.path.exists(URLS_PATH):
        # If urls.json missing, we allow ingestion to continue with local docs only
        return []

    with open(URLS_PATH, "r", encoding="utf-8") as f:
        obj = json.load(f)

    urls = obj.get("urls", [])
    return [u.strip() for u in urls if isinstance(u, str) and u.strip()]


def chunk_text(text: str, chunk_size_words: int = 900, overlap_words: int = 150) -> List[str]:
    """
    Simple word-based chunking (fast + reliable).
    """
    text = (text or "").strip()
    if not text:
        return []

    words = text.split()
    chunks = []
    i = 0
    step = max(1, chunk_size_words - overlap_words)

    while i < len(words):
        chunk = words[i:i + chunk_size_words]
        chunks.append(" ".join(chunk))
        i += step

    return chunks


# -------------------------
# URL ingestion
# -------------------------
def build_docs_from_urls(urls: List[str]) -> List[Dict]:
    docs: List[Dict] = []
    for url in urls:
        try:
            page = fetch_page_text(url, use_cache=True)
            chunks = chunk_text(page.get("text", ""))

            for idx, ch in enumerate(chunks):
                docs.append({
                    "text": ch,
                    "meta": {
                        "source_type": "url",
                        "url": page.get("url", url),
                        "title": page.get("title", url),
                        "chunk": idx,
                    }
                })
        except Exception:
            # skip bad URLs but continue ingestion
            continue
    return docs


# -------------------------
# Local docs ingestion
# -------------------------
def list_local_files() -> List[str]:
    """
    Reads local files from data/docs/
    Supported: .txt, .md, .pdf (text-based PDFs)
    """
    if not os.path.exists(DOCS_DIR):
        return []

    paths = []
    for name in os.listdir(DOCS_DIR):
        p = os.path.join(DOCS_DIR, name)
        if not os.path.isfile(p):
            continue
        ext = os.path.splitext(name)[1].lower()
        if ext in [".txt", ".md", ".pdf"]:
            paths.append(p)
    return sorted(paths)


def read_text_file(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        return f.read()


def read_pdf_text(path: str) -> str:
    """
    Works best on selectable-text PDFs.
    Scanned/image-only PDFs will extract very little.
    """
    reader = PdfReader(path)
    parts = []
    for page in reader.pages:
        try:
            parts.append(page.extract_text() or "")
        except Exception:
            continue
    return "\n".join(parts).strip()


def build_docs_from_files(file_paths: List[str]) -> List[Dict]:
    docs: List[Dict] = []

    for path in file_paths:
        name = os.path.basename(path)
        ext = os.path.splitext(name)[1].lower()

        try:
            if ext in [".txt", ".md"]:
                text = read_text_file(path)
            elif ext == ".pdf":
                text = read_pdf_text(path)
            else:
                continue
        except Exception:
            continue

        chunks = chunk_text(text)
        for idx, ch in enumerate(chunks):
            docs.append({
                "text": ch,
                "meta": {
                    "source_type": "file",
                    "url": f"file://{name}",
                    "title": name,
                    "chunk": idx,
                }
            })

    return docs


# -------------------------
# Index building
# -------------------------
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
    url_docs = build_docs_from_urls(urls) if urls else []

    file_paths = list_local_files()
    file_docs = build_docs_from_files(file_paths) if file_paths else []

    docs = url_docs + file_docs

    if not docs:
        raise RuntimeError(
            "No documents found.\n"
            "- Add URLs to data/urls.json OR\n"
            "- Add files to data/docs/ (.txt, .md, .pdf)"
        )

    build_faiss_index(docs)

    print("✅ Ingestion complete")
    print(f"URLs: {len(urls)}")
    print(f"Local files: {len(file_paths)}")
    print(f"Chunks: {len(docs)}")
    print(f"Saved index: {FAISS_INDEX_PATH}")
    print(f"Saved docs:  {DOCSTORE_PATH}")


if __name__ == "__main__":
    run_ingestion()