# backend/app/suggestions.py
from typing import List


def default_suggestions() -> List[str]:
    """
    Suggestions shown when chat opens and after flows complete.
    """
    return [
        "Tell us about your services",
        "Contact us",
        "Change response language",
    ]


def suggestions_for_intent(intent: str) -> List[str]:
    """
    Suggestions used inside specific flows/intents.
    """
    intent = (intent or "").lower()

    if intent == "contact":
        return [
            "I want to contact support",
            "Back to main menu",
        ]

    if intent == "language":
        return [
            "Sinhala",
            "Tamil",
            "English",
        ]

    if intent == "services":
        return [
            "What is Food SysLink?",
            "How does it work?",
            "What problems does it solve?",
            "Change response language",
            "Contact us",
        ]

    return default_suggestions()


def suggestions_from_text(user_text: str) -> List[str]:
    """
    When user types a custom prompt, old suggestions should disappear
    and new related ones should appear.

    This is a lightweight keyword-based approach (fast and free).
    You can improve it later using embeddings or an LLM.
    """
    t = (user_text or "").lower()

    # If they ask about language, show language options
    if any(k in t for k in ["language", "sinhala", "tamil", "english", "translate"]):
        return ["Sinhala", "Tamil", "English"]

    # If they ask about contact/support
    if any(k in t for k in ["contact", "support", "help", "email", "reach"]):
        return ["Contact us", "Tell us about your services", "Change response language"]

    # If they ask about services/features/about
    if any(k in t for k in ["service", "services", "feature", "about", "what is", "syslink"]):
        return [
            "Tell us about your services",
            "What is Food SysLink?",
            "How does it work?",
            "Contact us",
        ]

    # Default suggestions
    return [
        "Tell us about your services",
        "Contact us",
        "Change response language",
    ]