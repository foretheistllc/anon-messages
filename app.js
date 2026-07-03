const API_URL = 'https://your-backend-url.com'; // 🔁 Replace with your deployed backend URL

async function createUser() {
  const name = document.getElementById('nameInput').value.trim();
  const errorEl = document.getElementById('error');
  const resultEl = document.getElementById('result');

  errorEl.classList.add('hidden');
  resultEl.classList.add('hidden');

  if (!name) {
    showError('Please enter your name!');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

    if (!res.ok) throw new Error('Failed to create user');

    const data = await res.json();
    const userId = data.id;

    const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '');
    const sendLink = `${baseUrl}send.html?to=${userId}`;
    const inboxLink = `${baseUrl}inbox.html?id=${userId}`;

    document.getElementById('shareLink').textContent = sendLink;
    document.getElementById('inboxLink').href = inboxLink;
    resultEl.classList.remove('hidden');
  } catch (err) {
    showError('Something went wrong. Please try again!');
  }
}

function copyLink() {
  const link = document.getElementById('shareLink').textContent;
  navigator.clipboard.writeText(link).then(() => {
    const btn = document.querySelector('.copy-btn');
    btn.textContent = 'Copied! ✅';
    setTimeout(() => btn.textContent = 'Copy 📋', 2000);
  });
}

function showError(msg) {
  const el = document.getElementById('error');
  el.textContent = msg;
  el.classList.remove('hidden');
}
