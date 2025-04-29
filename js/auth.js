// js/auth.js
const API = 'http://localhost:4000/users';

// Registrierung
const regForm = document.getElementById('registerForm');
if (regForm) {
  regForm.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.role = 'client';

    // E-Mail-Existenz prüfen
    const exists = await fetch(`${API}?email=${encodeURIComponent(data.email)}`)
      .then(r => r.json());
    if (exists.length) {
      document.getElementById('registerMessage').innerText = 'E-Mail existiert bereits.';
      return;
    }

    // Nutzer anlegen
    const resp = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (resp.ok) {
      window.location.href = 'login.html';
    } else {
      document.getElementById('registerMessage').innerText = 'Registrierung fehlgeschlagen.';
    }
  });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.target));

    const users = await fetch(
      `${API}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    ).then(r => r.json());

    if (!users.length) {
      document.getElementById('loginMessage').innerText = 'E-Mail oder Passwort falsch.';
      return;
    }

    const user = users[0];
    sessionStorage.setItem('currentUser', JSON.stringify(user));

    // je nach Rolle umleiten
    if (user.role === 'admin')      window.location.href = 'admin-dashboard.html';
    else if (user.role === 'employee') window.location.href = 'employee-dashboard.html';
    else                              window.location.href = 'client-dashboard.html';
  });
}
