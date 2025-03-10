// /pages/api/employees.js
import { initDB } from '../../lib/db';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  const db = await initDB();
  db.data.employees = db.data.employees || [];
  
  if (req.method === 'GET') {
    // Gibt alle Mitarbeiter zurück
    return res.status(200).json({ employees: db.data.employees });
  } else if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    
    const newEmployee = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      password // In Produktion: Passwort mit bcrypt hashen!
    };
    
    db.data.employees.push(newEmployee);
    await db.write();
    
    return res.status(201).json({ message: 'Employee created', employee: newEmployee });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
