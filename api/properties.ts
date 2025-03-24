// api/properties.ts
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export default function propertiesHandler(req: Request, res: Response) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
  const filePath = path.join(process.cwd(), "data", "properties.json");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const properties = JSON.parse(data);
    return res.status(200).json({ success: true, properties });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error reading properties" });
  }
}

