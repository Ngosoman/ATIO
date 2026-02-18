from .gemini_client import get_model

async def generate_advisor_frame(user_query: str):
    client = get_model()

    prompt = f"""
    Summarize the user's search intent in one clear professional sentence under 25 words.
    No extra commentary.

    Query: "{user_query}"
    """

    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=prompt
    )

    return response.text.strip()
