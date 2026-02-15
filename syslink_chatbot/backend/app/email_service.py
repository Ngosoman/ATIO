import os
import json
import time
import smtplib
from email.message import EmailMessage
from typing import Dict

from .config import DATA_DIR


CONTACT_LOG_PATH = os.path.join(DATA_DIR, "contact_messages.jsonl")


def _save_locally(user_email: str, user_message: str) -> None:
    os.makedirs(DATA_DIR, exist_ok=True)
    entry = {
        "email": user_email,
        "message": user_message,
        "created_at": int(time.time())
    }
    with open(CONTACT_LOG_PATH, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")


def send_contact_email(user_email: str, user_message: str) -> Dict:
    """
    Free method: Use SMTP with your email account.
    If SMTP isn't configured, we store messages locally and return ok=False.
    """

    # Always store a copy locally (good for backup)
    _save_locally(user_email, user_message)

    # SMTP settings from environment
    smtp_host = os.getenv("SMTP_HOST", "")
    smtp_port = int(os.getenv("SMTP_PORT", "0") or "0")
    smtp_user = os.getenv("SMTP_USER", "")
    smtp_pass = os.getenv("SMTP_PASS", "")
    to_email = os.getenv("CONTACT_TO_EMAIL", "")

    # If not configured, don't fail the whole chatbot
    if not (smtp_host and smtp_port and smtp_user and smtp_pass and to_email):
        return {"ok": False, "error": "SMTP not configured"}

    try:
        msg = EmailMessage()
        msg["Subject"] = "New Contact Message - SysLink Food System"
        msg["From"] = smtp_user
        msg["To"] = to_email

        msg.set_content(
            f"User Email: {user_email}\n\n"
            f"Message:\n{user_message}\n"
        )

        # TLS connection
        with smtplib.SMTP(smtp_host, smtp_port, timeout=30) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)

        return {"ok": True}

    except Exception as e:
        return {"ok": False, "error": str(e)}