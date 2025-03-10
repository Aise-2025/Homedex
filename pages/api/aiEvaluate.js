// /pages/api/aiEvaluate.js
import { initDB } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'Missing id' });
  }

  const db = await initDB();
  // Suche die Verkaufsanfrage anhand der id
  const sale = db.data.sales.find(s => s.id === id);
  if (!sale) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  // Beispiel-KI-Bewertung: 3 % Aufschlag auf den aktuellen Preis
  const aiPrice = sale.price ? sale.price * 1.03 : 0;

  return res.status(200).json({ aiPrice });
}
