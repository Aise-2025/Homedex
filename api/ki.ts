// api/ki.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function kiHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
  
  const { property } = req.body;
  // Dummy-Berechnung: Preis wird um einen zufälligen Wert zwischen 0 und 10% erhöht
  const newPrice = Math.round((property.price || 100000) * (1 + Math.random() * 0.1));
  
  return res.status(200).json({ success: true, price: newPrice });
}
