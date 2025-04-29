// js/auth.js
const API = 'http://localhost:4000/api';

// Registrierung
const regForm = document.getElementById('registerForm');
if (regForm) {
  regForm.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.role = 'client';
    const resp = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await resp.json();
    if (!result.success) {
      document.getElementById('registerMessage').innerText = result.message;
      return;
    }
    // Erfolg → weiter zum Login
    window.location.href = 'login.html';
  });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.target));
    const users = await fetch(
      `${API}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    ).then(r => r.json());
    if (!users.length) {
      document.getElementById('loginMessage').innerText = 'Ungültige Daten.';
      return;
    }
    const user = users[0];
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    // Je nach Rolle weiterleiten
    if (user.role === 'client') window.location.href = 'client-dashboard.html';
    if (user.role === 'employee') window.location.href = 'employee-dashboard.html';
    if (user.role === 'admin') window.location.href = 'admin-dashboard.html';
  });
}
