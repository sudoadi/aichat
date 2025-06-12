const form = document.getElementById('chat-form');
const input = document.getElementById('input');
const messagesDiv = document.getElementById('messages');

function addMessage(content, role) {
  const msg = document.createElement('div');
  msg.className = `message ${role}`;
  msg.textContent = content;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  input.value = '';

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  addMessage(data.reply, 'assistant');
});