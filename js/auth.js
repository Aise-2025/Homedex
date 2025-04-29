const API = 'http://localhost:4000';
const regForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

if (regForm) regForm.addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  data.role = 'client';
  const exists = await fetch(`${API}/users?email=${encodeURIComponent(data.email)}`).then(r => r.json());
  if (exists.length) return document.getElementById('registerMessage').innerText = 'E-Mail existiert.';
  await fetch(`${API}/users`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) });
  location.href = 'login.html';
});

if (loginForm) loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  const {email, password} = Object.fromEntries(new FormData(e.target));
  const users = await fetch(`${API}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`).then(r => r.json());
  if (!users.length) return document.getElementById('loginMessage').innerText = 'Ungültige Daten.';
  sessionStorage.setItem('currentUser', JSON.stringify(users[0]));
  location.href = `${users[0].role}-dashboard.html`;
});

