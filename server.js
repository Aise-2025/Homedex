// server.js
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 4000;
const USER_PATH = path.join(process.cwd(), 'data', 'users.json');

// CORS und JSON-Body-Parsing aktivieren
app.use(cors());
app.use(express.json());

// Hilfsfunktionen zum Laden/Speichern
function loadUsers() {
  try {
    return JSON.parse(fs.readFileSync(USER_PATH, 'utf8'));
  } catch {
    return [];
  }
}
function saveUsers(users) {
  fs.writeFileSync(USER_PATH, JSON.stringify(users, null, 2), 'utf8');
}

// Registrierung
app.post('/api/register', (req, res) => {
  const { firstName, lastName, birthDate, country, email, password, role } = req.body;
  const users = loadUsers();

  // E-Mail-Duplikat prüfen
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ success: false, message: 'E-Mail existiert bereits.' });
  }

  const newUser = {
    id: Date.now(),
    firstName,
    lastName,
    birthDate,
    country,
    email,
    password,
    role: role || 'client'
  };
  users.push(newUser);
  saveUsers(users);

  res.json({ success: true, user: newUser });
});

// Login-Abfrage
app.get('/api/users', (req, res) => {
  const { email, password } = req.query;
  const users = loadUsers();
  const found = users.filter(u =>
    u.email.toLowerCase() === email.toLowerCase() &&
    u.password === password
  );
  res.json(found);
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚀 Backend läuft auf http://localhost:${PORT}`);
});
