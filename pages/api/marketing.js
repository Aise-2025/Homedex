// /pages/api/marketing.js
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
  
  // Stelle sicher, dass es sich um ein Marketing-Angebot handelt
  if (saleData.offerType !== 'vermarktung') {
    return res.status(400).json({ message: 'Invalid offer type for marketing' });
  }
  
  // Generiere eine eindeutige ID und einen Zeitstempel
  saleData.id = uuidv4();
  saleData.timestamp = Date.now();
  
  const db = await initDB();
  db.data.sales.push(saleData);
  await db.write();
  
  return res.status(200).json({ id: saleData.id });
}

