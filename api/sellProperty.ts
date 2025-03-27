export {}; // Fügt eine leere Export-Anweisung hinzu

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// Beispiel-Code: Nehmen wir an, hier werden die Immobilie-Daten gespeichert
export default function sellPropertyHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
  
  // Hier wird der Body des Requests verarbeitet, z.B. mit FormData etc.
  // Dies ist nur ein Beispiel, passe es an deine Anforderungen an:
  const data = req.body;
  
  // Beispiel: Schreibe die Daten in eine JSON-Datei (für MVP-Zwecke)
  const filePath = path.join(process.cwd(), "data", "properties.json");
  
  let properties = [];
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    properties = JSON.parse(fileData);
  } catch (error) {
    console.error("Fehler beim Lesen der Datei:", error);
  }
  
  // Füge die neue Immobilie hinzu
  properties.push(data);
  
  try {
    fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), "utf8");
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Fehler beim Schreiben der Datei:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

