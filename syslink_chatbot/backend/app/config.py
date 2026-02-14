import os
from dotenv import load_dotenv

load_dotenv()

# Storage
DATA_DIR = os.getenv("DATA_DIR", "data")
FAISS_INDEX_PATH = os.path.join(DATA_DIR, "faiss.index")
DOCSTORE_PATH = os.path.join(DATA_DIR, "docs.pkl")
RAW_CACHE_PATH = os.path.join(DATA_DIR, "raw_cache.jsonl")
URLS_PATH = os.path.join(DATA_DIR, "urls.json")

# Retrieval + Web fallback tuning
MIN_TOP_SCORE = float(os.getenv("MIN_TOP_SCORE", "0.30"))
WEB_MAX_RESULTS = int(os.getenv("WEB_MAX_RESULTS", "3"))

# Embeddings (free local)
EMBED_MODEL_NAME = os.getenv(
    "EMBED_MODEL_NAME",
    "sentence-transformers/all-MiniLM-L6-v2"
)

# LLM Provider (free local via Ollama)
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "ollama").lower()
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "phi3")

# Chatbot identity (UI + greeting)
BOT_NAME = os.getenv("BOT_NAME", "SysLink Assistant")
BOT_WELCOME = os.getenv(
    "BOT_WELCOME",
    "Welcome to SysLink Food System 👋 How can I help you today?"
)
BOT_LOGO_URL = os.getenv("BOT_LOGO_URL", "/assets/bot-logo.png")