// /pages/api/register.js
import { initDB } from '../../lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  
  const db = await initDB();
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  // Überprüfe, ob der Nutzer bereits existiert
  const existingUser = db.data.users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // Passwort hashen
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Erstelle den neuen Nutzer
  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
  };
  
  db.data.users.push(newUser);
  await db.write();
  
  return res.status(201).json({ message: 'User registered successfully' });
}

