// /lib/db.js
import { Low, JSONFile } from 'lowdb';
import path from 'path';

let db = null;

export async function initDB() {
  if (db) return db;
  
  // Erstelle den absoluten Pfad zur db.json im Projekt-Root
  const filePath = path.join(process.cwd(), 'db.json');
  const adapter = new JSONFile(filePath);
  db = new Low(adapter);
  
  await db.read();
  // Setze Standardwerte, falls die DB noch leer ist
  db.data ||= { sales: [], employees: [], users: [] };
  await db.write();
  
  return db;
}
