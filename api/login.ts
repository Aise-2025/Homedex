// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { email, password } = req.body;
  const filePath = path.join(process.cwd(), "data", "users.json");

  let users = [];
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    users = JSON.parse(fileData);
  } catch (error) {
    console.error("Fehler beim Lesen der Datei:", error);
  }

  // Admin-Daten (MVP: direkt im Code, wie zuvor)
  const adminEmail = "frohlichmartin28@gmail.com";
  const adminPassword = "Heinz100335";

  // Überprüfe Admin-Login
  if (email === adminEmail && password === adminPassword) {
    return res.status(200).json({ success: true, token: "dummy-admin-token", role: "mitarbeiter" });
  }

  // Suche Nutzer in der JSON-Datei
  const user = users.find((u: any) => u.email === email && u.password === password);
  if (user) {
    // Dummy-Token generieren, in einem echten System sollte hier ein JWT verwendet werden.
    return res.status(200).json({ success: true, token: "dummy-user-token", role: user.role || "nutzer" });
  }

  return res.status(401).json({ success: false, message: "Falsche Zugangsdaten" });
}
