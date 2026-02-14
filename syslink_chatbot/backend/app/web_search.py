# backend/app/web_search.py
from typing import List, Dict
from duckduckgo_search import DDGS


def web_search(query: str, max_results: int = 3) -> List[Dict]:
    """
    DuckDuckGo web search (free).
    Returns: [{"title": "...", "url": "..."}]
    """
    results: List[Dict] = []

    with DDGS() as ddgs:
        for r in ddgs.text(query, max_results=max_results):
            href = r.get("href")
            title = r.get("title")
            if href and title:
                results.append({"title": title, "url": href})

    return results