const form = document.getElementById("chat-form");
const input = document.getElementById("message");
const chat = document.getElementById("chat");
const sendButton = document.getElementById("send-button");

const conversation = [];

function addMessage(who, text) {
  const div = document.createElement("div");
  div.className = `message ${who === "NIA" ? "nia" : "user"}`;
  div.innerHTML = `<strong>${who}</strong><p></p>`;
  div.querySelector("p").textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function askNia(text) {
  conversation.push({ role: "user", content: text });

  // Keep the request small and preserve recent conversation context.
  const recent = conversation.slice(-20);

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: recent })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "NIA could not respond.");
  }

  conversation.push({ role: "assistant", content: data.reply });
  return data.reply;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text || sendButton.disabled) return;

  addMessage("You", text);
  input.value = "";
  sendButton.disabled = true;
  sendButton.textContent = "Thinking…";

  try {
    const reply = await askNia(text);
    addMessage("NIA", reply);
  } catch (error) {
    addMessage("NIA", `Sorry, I couldn't connect right now. ${error.message}`);
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = "Send";
    input.focus();
  }
});
