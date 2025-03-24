// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { fullName, email, password, phone, language } = req.body;

  // Pfad zur JSON-Datei (absolute Pfadangabe)
  const filePath = path.join(process.cwd(), "data", "users.json");

  let users = [];
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    users = JSON.parse(fileData);
  } catch (error) {
    console.error("Fehler beim Lesen der Datei:", error);
  }

  // Überprüfe, ob der Nutzer bereits existiert
  const userExists = users.find((user: any) => user.email === email);
  if (userExists) {
    return res.status(409).json({ success: false, message: "Nutzer existiert bereits" });
  }

  // Erstelle einen neuen Nutzer
  const newUser = { fullName, email, password, phone, language, role: "nutzer" };
  users.push(newUser);

  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf8");
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Fehler beim Schreiben in die Datei:", error);
    return res.status(500).json({ success: false, message: "Serverfehler" });
  }
}
