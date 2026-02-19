# 🌿 ATIO Assistant: Intelligence & Innovation Guide

[![Gemini](https://img.shields.io/badge/AI-Google%20Gemini%20Flash-blueviolet)](https://deepmind.google/technologies/gemini/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Language-Python%203.14-FFD43B)](https://www.python.org/)

Welcome to the **ATIO Assistant**, a state-of-the-art AI guide designed to bridge the gap between complex agrifood data and actionable technical insights. 

---

## 🚀 Key Technologies
The ATIO Assistant is built on a modern, high-performance stack:

- **AI Engine**: `models/gemini-flash-latest` — Optimized for speed and technical accuracy.
- **Backend API**: **FastAPI** — High-performance Python framework handles concurrent user requests.
- **Real-Time Delivery**: **Server-Sent Events (SSE)** — Enables response streaming so answers appear instantly.
- **Knowledge Grounding**: **JSON Knowledge Base** — The AI is anchored in your local technical data to prevent hallucinations.
- **Frontend**: **Vite + React** — A lightning-fast, premium user interface with smooth transitions.

---

## ✨ Features
- **⚡ Instant Streaming**: No more waiting. The AI starts "typing" its answer the moment it processes your intent.
- **📚 Local Context**: Prioritizes information from `Folder/data/` for precise, project-specific answers.
- **💬 Simplified Persona**: Built to be professional, friendly, and easy to understand for all stakeholders.
- **🔄 Hybrid Knowledge**: Gracefully falls back to broad technical training data for queries outside the local scope.

---

## 🛠️ How to Get Started

### 1. Launch the Backend
```bash
# Navigate to the Folder directory
cd "Folder"

# Install dependencies if you haven't already
pip install -r requirements.txt

# Start the high-performance server
python main.py

#RUN The Frontend using:
npm run dev
```

### 2. Enter the Interface
- **Primary**: Use the floating chat button in the main **ATIO Platform**.
- **Development**: Open `index.html` to test the standalone streaming client.

---

## 💡 Pro Tips for Interacting
- Ask about **vertical farming** or **irrigation** for deep dives.
- Ask "What is Project ATIO?" to see local data in action.
- Use the **Voice Read** feature in the main app to hear responses aloud.

---

*Part of the ATIO Advanced Technical Information Organizer suite.*
