// /pages/api/sell.js
import { initDB } from '../../lib/db';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const saleData = req.body;
  if (!saleData) {
    return res.status(400).json({ message: 'No data provided' });
  }
  
  // Generiere eine eindeutige ID und setze den Zeitstempel
  saleData.id = uuidv4();
  saleData.timestamp = Date.now();
  
  // Optionale Validierung: Prüfe, ob ein Angebots-Typ angegeben ist
  if (!saleData.offerType) {
    return res.status(400).json({ message: 'Missing offer type' });
  }
  
  const db = await initDB();
  db.data.sales.push(saleData);
  await db.write();
  
  return res.status(200).json({ id: saleData.id });
}
