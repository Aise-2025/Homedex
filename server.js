const API_BASE = window.location.origin;

// Registrierung
regForm.addEventListener('submit', async e => {
  e.preventDefault();
  const data = {
    firstName: e.target.firstName.value,
    lastName: e.target.lastName.value,
    birthDate: e.target.birthDate.value,
    country: e.target.country.value,
    email: e.target.email.value,
    password: e.target.password.value,
    role: 'client'
  };
  // POST /users
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (res.status === 409) {
    document.getElementById('registerMessage').innerText = 'E-Mail existiert bereits.';
    return;
  }
  window.location.href = 'login.html';
});

// Login
loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  const email = e.target.email.value;
  const pwd   = e.target.password.value;
  const res   = await fetch(`${API_BASE}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(pwd)}`);
  const users = await res.json();
  if (!users.length) {
    document.getElementById('loginMessage').innerText = 'Ungültige Daten.';
    return;
  }
  const user = users[0];
  sessionStorage.setItem('currentUser', JSON.stringify(user));
  if (user.role === 'admin') window.location.href = 'admin-dashboard.html';
  else if (user.role === 'employee') window.location.href = 'employee-dashboard.html';
  else window.location.href = 'client-dashboard.html';
});
