import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
  
  try {
    const { propertyId, userId, offerPrice } = req.body;

    if (!propertyId || !userId || offerPrice === undefined) {
      return res.status(400).json({ success: false, message: "Missing propertyId, userId or offerPrice" });
    }
    
    // Pfad zur JSON-Datei, in der die Preisangebote gespeichert werden
    const filePath = path.join(process.cwd(), "data", "priceOffers.json");
    
    let offers = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      offers = JSON.parse(fileData);
    }
    
    const newOffer = {
      id: Date.now(), // Verwende den Zeitstempel als einfache ID
      propertyId,
      userId,
      offerPrice,
      createdAt: new Date().toISOString()
    };
    
    offers.push(newOffer);
    fs.writeFileSync(filePath, JSON.stringify(offers, null, 2), "utf8");
    
    return res.status(201).json({ success: true, offer: newOffer });
  } catch (error) {
    console.error("Error in priceOffer API:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
