// /pages/api/aiEvaluate.js
import { initDB } from '../../lib/db';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Missing id' });
    }

    const db = await initDB();
    if (!db || !db.data || !Array.isArray(db.data.sales)) {
      return res.status(500).json({ error: 'Database not properly initialized' });
    }

    // Suche die Verkaufsanfrage anhand der id
    const sale = db.data.sales.find(s => s.id === id);
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' });
    }

    // Beispiel-KI-Bewertung: 3 % Aufschlag auf den aktuellen Preis
    const aiPrice = sale.price && typeof sale.price === 'number' ? sale.price * 1.03 : null;
    
    if (aiPrice === null) {
      return res.status(400).json({ error: 'Invalid sale price' });
    }

    return res.status(200).json({ aiPrice });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
