import json
from .gemini_client import get_model

async def parse_query(user_query: str):
    client = get_model()

    prompt = f"""
    Extract structured search filters from this query.
    Return ONLY valid JSON with:
    - country
    - region
    - theme
    - target_group
    - constraint

    Query: "{user_query}"
    """

    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=prompt
    )

    text = response.text.strip()

    try:
        return json.loads(text)
    except:
        return {}
