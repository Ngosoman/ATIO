from typing import List, Dict
from duckduckgo_search import DDGS
from duckduckgo_search.exceptions import RatelimitException


def web_search(query: str, max_results: int = 3) -> List[Dict]:
    """
    DuckDuckGo web search (free).
    If rate-limited, returns empty list instead of crashing.
    """
    results: List[Dict] = []
    try:
        with DDGS() as ddgs:
            for r in ddgs.text(query, max_results=max_results):
                href = r.get("href")
                title = r.get("title")
                if href and title:
                    results.append({"title": title, "url": href})
    except RatelimitException:
        return []
    except Exception:
        return []

    return results