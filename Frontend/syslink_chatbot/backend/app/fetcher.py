import os
import json
import re
import time
from typing import Dict

import requests
from bs4 import BeautifulSoup

from .config import RAW_CACHE_PATH


USER_AGENT = "SysLinkBot/1.0 (RAG educational project)"


def _clean_text(text: str) -> str:
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def _load_cache() -> dict:
    if not os.path.exists(RAW_CACHE_PATH):
        return {}

    cache = {}
    with open(RAW_CACHE_PATH, "r", encoding="utf-8") as f:
        for line in f:
            try:
                obj = json.loads(line)
                cache[obj["url"]] = obj
            except:
                continue
    return cache


def _append_cache(entry: Dict):
    os.makedirs(os.path.dirname(RAW_CACHE_PATH), exist_ok=True)
    with open(RAW_CACHE_PATH, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")


def fetch_page_text(url: str, use_cache: bool = True) -> Dict:
    """
    Fetch webpage content and return cleaned main text.
    Caches pages to reduce repeated web delays.
    """

    cache = _load_cache()

    if use_cache and url in cache:
        return cache[url]

    headers = {"User-Agent": USER_AGENT}
    resp = requests.get(url, headers=headers, timeout=30)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "lxml")

    # Remove noisy tags
    for tag in soup(["script", "style", "noscript", "svg", "footer", "nav"]):
        tag.decompose()

    main = soup.find("main") or soup.body
    if not main:
        raise ValueError("No readable content found")

    text = _clean_text(main.get_text(separator=" "))

    title = soup.title.get_text(strip=True) if soup.title else url

    result = {
        "url": url,
        "title": title,
        "text": text,
        "fetched_at": int(time.time())
    }

    _append_cache(result)

    return result