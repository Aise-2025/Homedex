// js/auth.js
const API = 'http://localhost:4000/api';

// Registrierung
const regForm = document.getElementById('registerForm');
if (regForm) {
  regForm.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
      firstName: e.target.firstName.value,
      lastName:  e.target.lastName.value,
      birthDate: e.target.birthDate.value,
      country:   e.target.country.value,
      email:     e.target.email.value,
      password:  e.target.password.value,
      role:      'client'
    };
    const resp = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await resp.json();
    if (!result.success) {
      document.getElementById('registerMessage').innerText = result.message || 'Registrierung fehlgeschlagen.';
      return;
    }
    // Erfolgreich: weiterleiten
    window.location.href = 'login.html';
  });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const pwd   = e.target.password.value;
    const users = await fetch(`${API}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(pwd)}`)
      .then(res => res.json());
    if (!users.length) {
      document.getElementById('loginMessage').innerText = 'Ungültige Daten.';
      return;
    }
    const user = users[0];
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    // Weiterleitung nach Rolle
    if (user.role === 'client')    window.location.href = 'client-dashboard.html';
    if (user.role === 'employee')  window.location.href = 'employee-dashboard.html';
    if (user.role === 'admin')     window.location.href = 'admin-dashboard.html';
  });
}
