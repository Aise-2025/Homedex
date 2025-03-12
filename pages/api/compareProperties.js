// /pages/api/compareProperties.js
import { initDB } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const db = await initDB();
  // Angenommen, alle Immobilien sind in db.data.sales gespeichert
  const properties = db.data.sales || [];

  // Wir erwarten, dass jede Immobilie bereits einen Preis hat – ggf. durch KI-Bewertung
  // Falls du weitere Berechnungen durchführen möchtest (z. B. KI-Bewertung dynamisch), 
  // kannst du das hier integrieren.
  const prices = properties
    .map(p => p.price)
    .filter(price => price != null && !isNaN(price));

  if (prices.length === 0) {
    return res.status(200).json({ recommendedPrice: 0, message: 'Keine Immobilien gefunden.' });
  }

  // Berechne den Medianpreis (dieser liegt über dem günstigsten, aber unter dem teuersten)
  prices.sort((a, b) => a - b);
  const medianPrice =
    prices.length % 2 === 1
      ? prices[Math.floor(prices.length / 2)]
      : (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2;

  return res.status(200).json({ recommendedPrice: medianPrice });
}
