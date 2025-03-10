// /pages/api/sell.js
import { initDB } from '../../lib/db';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  const db = await initDB();
  
  // Erwarte, dass der Request-Body alle erforderlichen Daten als JSON enthält.
  const saleData = req.body;
  
  // Eindeutige ID und Zeitstempel hinzufügen
  saleData.id = uuidv4();
  saleData.timestamp = Date.now();
  
  // Stelle sicher, dass der Bereich für Verkäufe existiert
  db.data.sales = db.data.sales || [];
  db.data.sales.push(saleData);
  
  await db.write();
  
  return res.status(200).json({ message: 'Sale data saved successfully', id: saleData.id });
}
