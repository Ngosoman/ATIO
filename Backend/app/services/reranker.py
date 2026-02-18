import json
from .gemini_client import get_model

async def rerank_results(user_query: str, results: list):
    client = get_model()

    formatted = "\n".join([
        f"{i+1}. {r['title']} - {r.get('ai_summary','')}"
        for i, r in enumerate(results)
    ])

    prompt = f"""
    User Query: {user_query}

    Rank these innovations by relevance.
    Return ONLY JSON array:
    [
      {{"index": 1, "score": 0.92}}
    ]

    Innovations:
    {formatted}
    """

    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=prompt
    )

    try:
        return json.loads(response.text)
    except:
        return []
