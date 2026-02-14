from __future__ import annotations
from typing import Dict, List, Optional
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
    - Language flow (choose language/region)
    """

    def __init__(self):
        # session_id -> state
        self.sessions: Dict[str, Dict] = {}

    # ---------- Suggestions ----------
    def default_suggestions(self) -> List[str]:
        return default_suggestions()

    # ---------- Session helpers ----------
    def _get(self, session_id: str) -> Dict:
        if session_id not in self.sessions:
            self.sessions[session_id] = {
                "mode": "normal",          # normal | contact_wait_msg | contact_wait_email | lang_wait
                "contact_msg": None,
                "lang": None,              # e.g. "Sinhala", "Tamil", "English"
            }
        return self.sessions[session_id]

    # ---------- Intents ----------
    def _detect_intents(self, text: str) -> List[str]:
        t = text.lower()

        intents = []
        if any(k in t for k in ["contact", "support", "help desk", "reach", "email us", "contact us"]):
            intents.append("contact")
        if any(k in t for k in ["language", "sinhala", "tamil", "english", "change language", "translate"]):
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
          "suggestions": [...]
          "lang": optional preferred language for RAG
        }
        """
        state = self._get(session_id)
        msg = user_message.strip()

        # 1) If we're in the middle of a flow, handle it first
        if state["mode"].startswith("contact_"):
            return self._handle_contact_flow(state, msg)

        if state["mode"] == "lang_wait":
            return self._handle_language_flow(state, msg)

        # 2) Not in a flow: detect intent(s)
        intents = self._detect_intents(msg)

        # If user typed custom prompt, we replace suggestions with new related ones
        dynamic_suggestions = suggestions_from_text(msg)

        # 3) Multi-intent handling (2+ in one message)
        # We'll handle flow intents first, then allow RAG for remaining.
        if "contact" in intents and "language" in intents:
            # Ask language first (quick), then contact
            state["mode"] = "lang_wait"
            return {
                "action": "flow",
                "answer": "Sure. Which language would you like (Sinhala / Tamil / English)?",
                "suggestions": suggestions_for_intent("language"),
                "lang": state.get("lang"),
            }

        if "language" in intents:
            state["mode"] = "lang_wait"
            return {
                "action": "flow",
                "answer": "Sure. Which language would you like (Sinhala / Tamil / English)?",
                "suggestions": suggestions_for_intent("language"),
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
            # Let RAG answer, but provide service-related suggestions
            return {
                "action": "rag",
                "answer": "",
                "suggestions": suggestions_for_intent("services"),
                "lang": state.get("lang"),
            }

        # 4) Default: RAG
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

            # Send email (free SMTP). If not configured, we still store and confirm.
            email = msg
            message = state.get("contact_msg") or ""

            result = send_contact_email(user_email=email, user_message=message)

            # Reset flow state
            state["mode"] = "normal"
            state["contact_msg"] = None

            if result["ok"]:
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

    def submit_contact(self, session_id: str, email: str, message: str) -> Dict:
        """
        Optional endpoint use.
        """
        state = self._get(session_id)
        result = send_contact_email(user_email=email, user_message=message)
        if result["ok"]:
            return {"ok": True, "message": "Sent"}
        return {"ok": False, "message": "Not configured"}

    def _is_valid_email(self, s: str) -> bool:
        return bool(re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", s.strip()))

    # ---------- Language flow ----------
    def _handle_language_flow(self, state: Dict, msg: str) -> Dict:
        t = msg.strip().lower()

        # Accept direct language choice
        if "sinhala" in t or t in ["si", "sinhala", "sin"]:
            state["lang"] = "Sinhala"
        elif "tamil" in t or t in ["ta", "tamil"]:
            state["lang"] = "Tamil"
        elif "english" in t or t in ["en", "english"]:
            state["lang"] = "English"
        else:
            # Accept region words -> map quickly
            # (You can expand this later)
            if any(k in t for k in ["sri lanka", "colombo", "kandy", "galle", "jaffna"]):
                state["lang"] = "Sinhala"
            else:
                return {
                    "action": "flow",
                    "answer": "Please type the language you want: Sinhala / Tamil / English.",
                    "suggestions": suggestions_for_intent("language"),
                    "lang": state.get("lang"),
                }

        # Finish language flow
        state["mode"] = "normal"
        return {
            "action": "flow",
            "answer": f"✅ Done. I’ll reply in {state['lang']} from now on.",
            "suggestions": default_suggestions(),
            "lang": state.get("lang"),
        }