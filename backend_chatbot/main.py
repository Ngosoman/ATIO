import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional
import google.generativeai as genai
from dotenv import load_dotenv

import json
from glob import glob

# Load environment variables
load_dotenv()

# Helper to load local data
def load_local_data() -> str:
    parts = []
    try:
        # Load small core files
        for filename in ['knowledge_base.json', 'faq.json', 'url.json']:
            path = os.path.join("data", filename)
            if os.path.exists(path):
                with open(path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    parts.append(f"\nSource {filename}: {json.dumps(data)}\n")
        
        # Mention innovation files exist
        innovation_files = glob("data/atiokb_innovations*.json")
        if innovation_files:
            parts.append(f"\nNote: Innovation files are present.\n")
    except Exception as e:
        print(f"Data load error: {e}")
    return "".join(parts)

LOCAL_KNOWLEDGE = load_local_data()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    api_key = "AIzaSyC6gqy-XFFx-FjkdssFW0t0hg5h6HqBMbU"

genai.configure(api_key=api_key)

# Global model with simplified and friendly persona
model_instr = (
    "You are the ATIO Assistant. Be simple, friendly, and very concise. "
    "Use clear language. Don't use big words. "
    "Keep answers short (1-2 small paragraphs). "
    "Use the context below. If not there, be brief based on what you know. "
    f"\nContext: {LOCAL_KNOWLEDGE}"
)

# Initializing without explicit search tool due to SDK/API version mismatch
# The model will still use its broad training data for general queries.
model = genai.GenerativeModel(
    model_name="models/gemini-flash-latest",
    system_instruction=model_instr
)

app = FastAPI(title="ATIO Assistant API")

# Enable CORS for React integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
async def root():
    return {"status": "ATIO Assistant is running (Streaming Enabled)"}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    if not request.message:
        raise HTTPException(status_code=400, detail="Message is missing")

    async def generate():
        try:
            # Use generate_content with stream=True for faster perceived speed
            response = model.generate_content(request.message, stream=True)
            for chunk in response:
                if chunk.text:
                    yield chunk.text
        except Exception as e:
            yield f"Error: {str(e)}"

    return StreamingResponse(generate(), media_type="text/plain")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
