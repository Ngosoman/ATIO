from __future__ import annotations

from typing import Dict, List
import re

from .email_service import send_contact_email
from .suggestions import (
    default_suggestions,
    suggestions_for_intent,
    suggestions_from_text,
)


class FlowManager:
    """
    Manages lightweight session state for:
    - Contact flow (collect message + email)
    - Language flow (ask region -> ask language)
    """

    def __init__(self):
        self.sessions: Dict[str, Dict] = {}

    # ---------- Suggestions ----------
    def default_suggestions(self) -> List[str]:
        return default_suggestions()

    # ---------- Session helpers ----------
    def _get(self, session_id: str) -> Dict:
        if session_id not in self.sessions:
            self.sessions[session_id] = {
                "mode": "normal",  # normal | contact_wait_msg | contact_wait_email | lang_wait_region | lang_wait_language
                "contact_msg": None,
                "lang": None,      # preferred language (string), e.g. "Sinhala"
                "region": None,    # store region (string) if provided
            }
        return self.sessions[session_id]

    # ---------- Intents ----------
    def _detect_intents(self, text: str) -> List[str]:
        t = (text or "").lower()

        intents: List[str] = []
        if any(k in t for k in ["contact", "support", "help desk", "reach", "email us", "contact us"]):
            intents.append("contact")
        if any(k in t for k in ["change response language", "change language", "language", "switch language", "translate"]):
            intents.append("language")
        if any(k in t for k in ["service", "services", "what do you do", "features", "what is syslink", "about"]):
            intents.append("services")

        return intents or ["rag"]

    # ---------- Main entry ----------
    def handle_message(self, session_id: str, user_message: str) -> Dict:
        """
        Returns dict:
        {
          "action": "flow" | "rag",
          "answer": "...",
          "suggestions": [...],
          "lang": optional preferred language for RAG
        }
        """
        state = self._get(session_id)
        msg = (user_message or "").strip()

        # 1) In-flow handling first
        if state["mode"].startswith("contact_"):
            return self._handle_contact_flow(state, msg)

        if state["mode"].startswith("lang_"):
            return self._handle_language_flow(state, msg)

        # 2) Detect intent(s)
        intents = self._detect_intents(msg)

        # If user typed a custom prompt, provide new related suggestions
        dynamic_suggestions = suggestions_from_text(msg)

        # 3) Multi-intent handling
        # If user asks "contact + language" together, do language first, then contact
        if "contact" in intents and "language" in intents:
            state["mode"] = "lang_wait_region"
            state["next_after_lang"] = "contact"
            return {
                "action": "flow",
                "answer": "Sure — first, tell me your region/country.",
                "suggestions": [],
                "lang": state.get("lang"),
            }

        # 4) Single intent handling
        if "language" in intents:
            state["mode"] = "lang_wait_region"
            state["next_after_lang"] = None
            return {
                "action": "flow",
                "answer": "Sure — tell me your region/country.",
                "suggestions": [],
                "lang": state.get("lang"),
            }

        if "contact" in intents:
            state["mode"] = "contact_wait_msg"
            return {
                "action": "flow",
                "answer": "Sure — please type your message for our team.",
                "suggestions": suggestions_for_intent("contact"),
                "lang": state.get("lang"),
            }

        if "services" in intents:
            return {
                "action": "rag",
                "answer": "",
                "suggestions": suggestions_for_intent("services"),
                "lang": state.get("lang"),
            }

        # 5) Default: RAG
        return {
            "action": "rag",
            "answer": "",
            "suggestions": dynamic_suggestions,
            "lang": state.get("lang"),
        }

    # ---------- Contact flow ----------
    def _handle_contact_flow(self, state: Dict, msg: str) -> Dict:
        if state["mode"] == "contact_wait_msg":
            state["contact_msg"] = msg
            state["mode"] = "contact_wait_email"
            return {
                "action": "flow",
                "answer": "Thanks. Now please enter your email address.",
                "suggestions": [],
                "lang": state.get("lang"),
            }

        if state["mode"] == "contact_wait_email":
            if not self._is_valid_email(msg):
                return {
                    "action": "flow",
                    "answer": "That email doesn’t look valid. Please type a valid email (example: name@gmail.com).",
                    "suggestions": [],
                    "lang": state.get("lang"),
                }

            email = msg
            message = state.get("contact_msg") or ""

            result = send_contact_email(user_email=email, user_message=message)

            # Reset flow state
            state["mode"] = "normal"
            state["contact_msg"] = None

            if result.get("ok"):
                return {
                    "action": "flow",
                    "answer": "✅ Sent! Thanks — our team will contact you soon.",
                    "suggestions": default_suggestions(),
                    "lang": state.get("lang"),
                }

            return {
                "action": "flow",
                "answer": (
                    "✅ I saved your message, but email sending isn’t configured yet on the server.\n"
                    "Our team can still contact you using the details you provided."
                ),
                "suggestions": default_suggestions(),
                "lang": state.get("lang"),
            }

        # fallback
        state["mode"] = "normal"
        return {"action": "rag", "answer": "", "suggestions": default_suggestions(), "lang": state.get("lang")}

    def _is_valid_email(self, s: str) -> bool:
        return bool(re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", (s or "").strip()))

    # ---------- Language flow (NO mapping) ----------
    def _handle_language_flow(self, state: Dict, msg: str) -> Dict:
        # Step 1: ask region
        if state["mode"] == "lang_wait_region":
            state["region"] = msg
            state["mode"] = "lang_wait_language"
            return {
                "action": "flow",
                "answer": "Thanks. What language would you like me to respond in? (Type it, e.g., Sinhala / Tamil / English)",
                "suggestions": ["Sinhala", "Tamil", "English"],
                "lang": state.get("lang"),
            }

        # Step 2: set language
        if state["mode"] == "lang_wait_language":
            chosen = (msg or "").strip()
            if not chosen:
                return {
                    "action": "flow",
                    "answer": "Please type the language you want (example: Sinhala / Tamil / English).",
                    "suggestions": ["Sinhala", "Tamil", "English"],
                    "lang": state.get("lang"),
                }

            state["lang"] = chosen
            state["mode"] = "normal"

            # If user wanted contact after language, jump into contact flow
            next_after = state.pop("next_after_lang", None)
            if next_after == "contact":
                state["mode"] = "contact_wait_msg"
                return {
                    "action": "flow",
                    "answer": f"✅ Done. I’ll reply in {state['lang']} from now on.\nNow, please type your message for our team.",
                    "suggestions": [],
                    "lang": state.get("lang"),
                }

            return {
                "action": "flow",
                "answer": f"✅ Done. I’ll reply in {state['lang']} from now on.",
                "suggestions": default_suggestions(),
                "lang": state.get("lang"),
            }

        # fallback
        state["mode"] = "normal"
        return {"action": "rag", "answer": "", "suggestions": default_suggestions(), "lang": state.get("lang")}
