// api/propertiesUpdate.ts
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export default function propertiesUpdateHandler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
  const { id, status } = req.body;
  const filePath = path.join(process.cwd(), "data", "properties.json");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    let properties = JSON.parse(data);
    const index = properties.findIndex((p: any) => p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }
    properties[index].status = status;
    fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), "utf8");
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating property" });
  }
}

