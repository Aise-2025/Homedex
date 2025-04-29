// server.js
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_PATH = path.join(process.cwd(), 'data', 'users.json');

app.use(express.json());

// Hilfsfunktion: alle User laden
function loadUsers() {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  } catch {
    return [];
  }
}

// Hilfsfunktion: alle User speichern
function saveUsers(users) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(users, null, 2), 'utf8');
}

// POST /api/register
app.post('/api/register', (req, res) => {
  const { firstName, lastName, birthDate, country, email, password, role } = req.body;
  const users = loadUsers();

  // E-Mail-Duplikate vermeiden
  if (users.find(u => u.email === email)) {
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

// GET /api/users?email=…&password=…
app.get('/api/users', (req, res) => {
  const { email, password } = req.query;
  const users = loadUsers();
  const filtered = users.filter(u => u.email === email && u.password === password);
  res.json(filtered);
});

app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`);
});

