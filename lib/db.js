import { Low, JSONFile } from 'lowdb';
import path from 'path';

let db = null;

export async function initDB() {
  if (db) return db;

  // Absoluten Pfad zur db.json setzen (im Projektverzeichnis)
  const filePath = path.join(process.cwd(), 'db.json');
  const adapter = new JSONFile(filePath);
  db = new Low(adapter);

  await db.read();
  // Falls die DB noch leer ist, Standardwerte setzen
  db.data ||= { users: [] };
  await db.write();

  return db;
}
