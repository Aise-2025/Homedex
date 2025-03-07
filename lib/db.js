// /lib/db.js
import { Low, JSONFile } from 'lowdb';

let db = null;

export async function initDB() {
  if (db) return db;

  const adapter = new JSONFile('db.json');
  db = new Low(adapter);
  await db.read();
  // Setze Standardwerte, falls die Datenbank noch leer ist
  db.data = db.data || { users: [] };
  await db.write();
  return db;
}

