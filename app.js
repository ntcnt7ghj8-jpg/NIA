const form = document.getElementById("chat-form");
const input = document.getElementById("message");
const chat = document.getElementById("chat");

function addMessage(who, text) {
  const div = document.createElement("div");
  div.className = `message ${who === "NIA" ? "nia" : "user"}`;
  div.innerHTML = `<strong>${who}</strong><p></p>`;
  div.querySelector("p").textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function niaReply(text) {
  const q = text.toLowerCase();
  if (q.includes("hello") || q.includes("hi")) return "Hello! I'm NIA. The chat test is working.";
  if (q.includes("who are you")) return "I'm NIA, your test chatbot.";
  if (q.includes("test")) return "Test received. NIA is responding correctly.";
  if (q.includes("help")) return "Try saying hello, asking who I am, or typing 'test'.";
  return `I received: "${text}". The basic NIA chat is working.`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addMessage("You", text);
  input.value = "";
  setTimeout(() => addMessage("NIA", niaReply(text)), 350);
});
