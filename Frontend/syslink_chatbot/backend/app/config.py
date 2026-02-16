import os
from dotenv import load_dotenv

load_dotenv()

# ==============================
# Storage
# ==============================
DATA_DIR = os.getenv("DATA_DIR", "data")
FAISS_INDEX_PATH = os.path.join(DATA_DIR, "faiss.index")
DOCSTORE_PATH = os.path.join(DATA_DIR, "docs.pkl")
RAW_CACHE_PATH = os.path.join(DATA_DIR, "raw_cache.jsonl")
URLS_PATH = os.path.join(DATA_DIR, "urls.json")

# ==============================
# Retrieval + Web fallback tuning
# ==============================
MIN_TOP_SCORE = float(os.getenv("MIN_TOP_SCORE", "0.30"))
WEB_MAX_RESULTS = int(os.getenv("WEB_MAX_RESULTS", "2"))

# ==============================
# Embeddings (free local CPU)
# ==============================
EMBED_MODEL_NAME = os.getenv(
    "EMBED_MODEL_NAME",
    "sentence-transformers/all-MiniLM-L6-v2"
)

# ==============================
# LLM Provider (Hugging Face Inference API)
# ==============================
LLM_PROVIDER = "huggingface"

HF_TOKEN = os.getenv("HF_TOKEN")
HF_MODEL = os.getenv("HF_MODEL", "mistralai/Mistral-7B-Instruct-v0.2")

# ==============================
# Chatbot identity (UI + greeting)
# ==============================
BOT_NAME = os.getenv("BOT_NAME", "SysLink Assistant")
BOT_WELCOME = os.getenv(
    "BOT_WELCOME",
    "Welcome to SysLink Food System 👋 How can I help you today?"
)
BOT_LOGO_URL = os.getenv("BOT_LOGO_URL", "")