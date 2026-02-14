// frontend/chatbot-widget/widget.js

const API_BASE = "http://127.0.0.1:8000";

let sessionId = "session-" + Math.random().toString(36).substring(2);
let isInitialized = false;

const chatBtn = document.getElementById("syslink-chat-btn");
const chatWindow = document.getElementById("syslink-chat-window");
const closeBtn = document.getElementById("syslink-close-btn");
const messagesDiv = document.getElementById("syslink-messages");
const input = document.getElementById("syslink-text");
const sendBtn = document.getElementById("syslink-send");
const suggestionsDiv = document.getElementById("syslink-suggestions");

chatBtn.onclick = () => {
  chatWindow.classList.remove("hidden");
  if (!isInitialized) {
    initChat();
  }
};

closeBtn.onclick = () => {
  chatWindow.classList.add("hidden");
};

sendBtn.onclick = sendMessage;
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function addMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("message", type === "user" ? "user-message" : "bot-message");
  div.innerText = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function setSuggestions(suggestions) {
  suggestionsDiv.innerHTML = "";
  suggestions.forEach((text) => {
    const btn = document.createElement("button");
    btn.className = "suggestion-btn";
    btn.innerText = text;
    btn.onclick = () => {
      input.value = text;
      sendMessage();
    };
    suggestionsDiv.appendChild(btn);
  });
}

async function initChat() {
  try {
    const res = await fetch(`${API_BASE}/init`);
    const data = await res.json();

    document.getElementById("syslink-bot-name").innerText = data.bot_name;
    document.getElementById("syslink-bot-logo").src = data.logo_url;

    addMessage(data.welcome, "bot");
    setSuggestions(data.suggestions);

    isInitialized = true;
  } catch (err) {
    addMessage("Unable to connect to server.", "bot");
  }
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";
  suggestionsDiv.innerHTML = ""; // remove old suggestions

  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionId,
        message: text,
      }),
    });

    const data = await res.json();

    addMessage(data.answer, "bot");

    if (data.sources && data.sources.length > 0) {
      data.sources.forEach((src) => {
        addMessage(`Source: ${src.title}`, "bot");
      });
    }

    setSuggestions(data.suggestions || []);
  } catch (err) {
    addMessage("Server error. Please try again.", "bot");
  }
}