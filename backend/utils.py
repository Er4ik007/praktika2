import os
import base64
import logging
from email.mime.text import MIMEText
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

logger = logging.getLogger(__name__)

# In-memory fallback для 2FA кодов (если колонки admin_code не существуют в БД)
_admin_codes = {}  # email -> {"code": "1234", "expires": datetime}


def send_gmail(to: str, subject: str, body: str, reply_to: str = None, content_type: str = "plain"):
    client_id = os.getenv("GMAIL_CLIENT_ID")
    client_secret = os.getenv("GMAIL_CLIENT_SECRET")
    refresh_token = os.getenv("GMAIL_REFRESH_TOKEN")
    sender = os.getenv("GMAIL_SENDER")

    if not all([client_id, client_secret, refresh_token, sender]):
        logger.warning("[Gmail] Пропускаю — не настроены GMAIL_* переменные")
        return

    creds = Credentials(
        token=None,
        refresh_token=refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=client_id,
        client_secret=client_secret,
    )
    creds.refresh(Request())
    service = build("gmail", "v1", credentials=creds)

    message = MIMEText(body, content_type, "utf-8")
    message["to"] = to
    message["from"] = sender
    message["subject"] = subject
    if reply_to:
        message["Reply-To"] = reply_to

    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
    service.users().messages().send(userId="me", body={"raw": raw}).execute()


def send_message_email(name: str, email: str, subject: str, body: str, source: str, category: str = None):
    label = "Поддержка" if source == "support" else "Контакты"
    category_line = f"Категория: {category}\n" if category else ""
    to_email = os.getenv("GMAIL_SENDER", "asasin.leha008@gmail.com")

    try:
        send_gmail(
            to=to_email,
            subject=f"[{label}] {subject}",
            body=(
                f"Новое обращение ({label})\n\n"
                f"От: {name}\n"
                f"Email: {email}\n"
                f"Тема: {subject}\n"
                f"{category_line}\n"
                f"Сообщение:\n{body}"
            ),
            reply_to=email
        )
        logger.info(f"[Gmail] Письмо отправлено: [{label}] {subject}")
    except Exception as e:
        logger.error(f"[Gmail] ОШИБКА: {e}")
