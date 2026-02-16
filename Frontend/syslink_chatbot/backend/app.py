import os
import uuid
from typing import List, Optional

import gradio as gr

from backend_app.flows import FlowManager
from backend_app.ingest import run_ingestion
from backend_app.rag_hf import RAGEngineHF
from backend_app.config import (
    DATA_DIR, FAISS_INDEX_PATH, DOCSTORE_PATH,
    BOT_NAME, BOT_WELCOME
)

# --------- Prepare data once ----------
os.makedirs(DATA_DIR, exist_ok=True)
if not (os.path.exists(FAISS_INDEX_PATH) and os.path.exists(DOCSTORE_PATH)):
    run_ingestion()

rag = RAGEngineHF()
flows = FlowManager()

# --------- Gradio UI ----------
def init_state():
    return {"session_id": "sess-" + uuid.uuid4().hex[:12], "initialized": False}

def render_suggestions(btns: Optional[List[str]]):
    btns = (btns or [])[:6]
    ups = []
    for i in range(6):
        if i < len(btns):
            ups.append(gr.update(value=btns[i], visible=True))
        else:
            ups.append(gr.update(value="", visible=False))
    return ups

def on_open(chat_history, state):
    chat_history = chat_history or []
    if not state.get("initialized", False):
        chat_history.append({"role": "assistant", "content": BOT_WELCOME})
        state["initialized"] = True
    return chat_history, state, *render_suggestions(flows.default_suggestions())

def handle_user_message(user_text, chat_history, state):
    chat_history = chat_history or []
    session_id = state["session_id"]

    user_text = (user_text or "").strip()
    if not user_text:
        return "", chat_history, state, *render_suggestions([])

    # user message
    chat_history.append({"role": "user", "content": user_text})

    try:
        flow_result = flows.handle_message(session_id=session_id, user_message=user_text)

        if flow_result["action"] == "rag":
            rag_result = rag.answer(user_text, preferred_lang=flow_result.get("lang"))
            bot_reply = rag_result.get("answer", "").strip()

            # Optional: show bot name in message
            if bot_reply:
                bot_reply = f"**{BOT_NAME}:** {bot_reply}"

            chat_history.append({"role": "assistant", "content": bot_reply or "I couldn't find enough info to answer that."})

            return "", chat_history, state, *render_suggestions(flow_result.get("suggestions", []))

        # Flow-only reply
        flow_answer = (flow_result.get("answer") or "").strip()
        if flow_answer:
            flow_answer = f"**{BOT_NAME}:** {flow_answer}"

        chat_history.append({"role": "assistant", "content": flow_answer or "Okay."})
        return "", chat_history, state, *render_suggestions(flow_result.get("suggestions", []))

    except Exception:
        chat_history.append({"role": "assistant", "content": f"**{BOT_NAME}:** Something went wrong temporarily. Please try again."})
        return "", chat_history, state, *render_suggestions(flows.default_suggestions())

def suggestion_click(text, chat_history, state):
    return handle_user_message(text, chat_history, state)

with gr.Blocks(title="SysLink Food System Chatbot") as demo:
    state = gr.State(init_state())

    gr.Markdown("## SysLink Food System Assistant")

    # ✅ Bot avatar shown in responses
    chat = gr.Chatbot(height=420)

    with gr.Row():
        s1 = gr.Button(visible=False)
        s2 = gr.Button(visible=False)
        s3 = gr.Button(visible=False)
        s4 = gr.Button(visible=False)
        s5 = gr.Button(visible=False)
        s6 = gr.Button(visible=False)

    user_in = gr.Textbox(placeholder="Type your message...", label="Message")
    send_btn = gr.Button("Send")
    open_btn = gr.Button("Open Chat")

    open_btn.click(on_open, inputs=[chat, state], outputs=[chat, state, s1, s2, s3, s4, s5, s6])
    send_btn.click(handle_user_message, inputs=[user_in, chat, state], outputs=[user_in, chat, state, s1, s2, s3, s4, s5, s6])
    user_in.submit(handle_user_message, inputs=[user_in, chat, state], outputs=[user_in, chat, state, s1, s2, s3, s4, s5, s6])

    for b in [s1, s2, s3, s4, s5, s6]:
        b.click(suggestion_click, inputs=[b, chat, state], outputs=[user_in, chat, state, s1, s2, s3, s4, s5, s6])

# ✅ HF Spaces: keep it simple (do NOT set server_port/server_name)
demo.queue()
demo.launch(show_error=True)