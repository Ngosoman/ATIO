(function () {
  const cfg = window.SYSLINK_CHAT_CONFIG || {};
  const SPACE_URL = cfg.spaceUrl || "https://tharunchndrn-syslink-chatbot.hf.space";
  const BOT_NAME = cfg.botName || "SysLink Assistant";
  const BOT_STATUS = cfg.botStatus || "Online";
  const LOGO_URL = cfg.logoUrl || "./bot-logo.png";

  // Create launcher button
  const launcher = document.createElement("button");
  launcher.id = "syslink-launcher";
  launcher.setAttribute("aria-label", "Open SysLink chat");
  launcher.innerHTML = "💬";

  // Create panel
  const panel = document.createElement("div");
  panel.id = "syslink-panel";

  panel.innerHTML = `
    <div id="syslink-header">
      <div id="syslink-header-left">
        <img id="syslink-logo" src="${LOGO_URL}" alt="SysLink Bot" />
        <div>
          <div id="syslink-title">${BOT_NAME}</div>
          <div id="syslink-status">${BOT_STATUS}</div>
        </div>
      </div>
      <button id="syslink-close" aria-label="Close chat">✖</button>
    </div>
    <iframe
      id="syslink-iframe"
      title="SysLink Chatbot"
      loading="lazy"
      referrerpolicy="no-referrer"
    ></iframe>
  `;

  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  const iframe = panel.querySelector("#syslink-iframe");
  const closeBtn = panel.querySelector("#syslink-close");

  let loadedOnce = false;

  function openChat() {
    panel.classList.add("open");
    if (!loadedOnce) {
      iframe.src = SPACE_URL; // load Gradio Space
      loadedOnce = true;
    }
  }

  function closeChat() {
    panel.classList.remove("open");
  }

  launcher.addEventListener("click", openChat);
  closeBtn.addEventListener("click", closeChat);

  // Optional: close when clicking outside the panel
  document.addEventListener("click", (e) => {
    if (!panel.classList.contains("open")) return;
    const isInside = panel.contains(e.target) || launcher.contains(e.target);
    if (!isInside) closeChat();
  });

  // ESC key closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeChat();
  });
})();