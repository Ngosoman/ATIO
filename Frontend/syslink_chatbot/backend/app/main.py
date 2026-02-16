
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

from .config import BOT_NAME, BOT_WELCOME, BOT_LOGO_URL
from .rag import RAGEngine
from .flows import FlowManager

app = FastAPI(title="SysLink Food System Chatbot")

# For testing. Later you can restrict origins to your real domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag: RAGEngine | None = None
flows: FlowManager | None = None


class InitResponse(BaseModel):
    bot_name: str
    welcome: str
    logo_url: str
    suggestions: list[str]


class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    session_id: str
    answer: str
    suggestions: list[str]
    sources: list[dict] = []
    used: str = "local"  # "local" or "web"


class ContactRequest(BaseModel):
    session_id: str
    email: EmailStr
    message: str


@app.on_event("startup")
def startup():
    global rag, flows
    rag = RAGEngine()
    flows = FlowManager()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/init", response_model=InitResponse)
def init_chat():
    """
    Called when the widget opens for the first time.
    Returns bot identity + greeting + default suggestion buttons.
    """
    assert flows is not None
    return {
        "bot_name": BOT_NAME,
        "welcome": BOT_WELCOME,
        "logo_url": BOT_LOGO_URL,
        "suggestions": flows.default_suggestions(),
    }


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    """
    Main chat endpoint.
    Uses flows (contact/language/services) + RAG (URL first, web fallback).
    """
    assert rag is not None and flows is not None

    # 1) Let flow manager handle special intents / multi-intents
    flow_result = flows.handle_message(session_id=req.session_id, user_message=req.message)

    # If flow_result says to call RAG, we do it; otherwise return the flow response.
    if flow_result["action"] == "rag":
        rag_result = rag.answer(req.message, preferred_lang=flow_result.get("lang"))
        return {
            "session_id": req.session_id,
            "answer": rag_result["answer"],
            "suggestions": flow_result.get("suggestions", []),
            "sources": rag_result.get("sources", []),
            "used": rag_result.get("used", "local"),
        }

    return {
        "session_id": req.session_id,
        "answer": flow_result["answer"],
        "suggestions": flow_result.get("suggestions", []),
        "sources": [],
        "used": "local",
    }


@app.post("/contact")
def contact(req: ContactRequest):
    """
    Optional: if you want the frontend to submit contact info separately.
    (We also support collecting email/message via chat flow.)
    """
    assert flows is not None
    return flows.submit_contact(session_id=req.session_id, email=req.email, message=req.message)