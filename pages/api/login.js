// /pages/api/login.js
import { initDB } from '../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; // In der Produktion in einer Umgebungsvariablen speichern!

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Admin-Login: Überprüfe, ob die eingegebenen Daten zum Admin-Konto passen
  if (email === "frohlichmartin28@gmail.com" && password === "Heint100335!") {
    const token = jwt.sign(
      { id: "admin", email, role: "admin" },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    return res.status(200).json({ token });
  }

  // Normale Nutzer: Suche in der Nutzerdatenbank
  const db = await initDB();
  const user = db.data.users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Erstelle ein Token für den normalen Nutzer
  const token = jwt.sign(
    { id: user.id, email: user.email, role: "user" },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  return res.status(200).json({ token });
}
