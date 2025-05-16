import { NextApiRequest, NextApiResponse } from "next";
import { MenuPageWebDB, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface ExtendedMenuPageWebDB extends MenuPageWebDB {
  submenu: MenuPageWebDB[];
}

// ✅ API handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "PUT":
        return await putShowOrder(req, res);
      default:
        return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function putShowOrder(req: NextApiRequest, res: NextApiResponse) {
  const { updates } = req.body;

  if (!Array.isArray(updates)) {
    return res.status(400).json({ success: false, error: "Invalid format: updates must be an array" });
  }

  // Validate structure
  for (const item of updates) {
    if (!item.id || typeof item.showOrder !== "number") {
      return res.status(400).json({
        success: false,
        error: "Each update must include id (string) and showOrder (number)",
      });
    }
  }

  try {
    const updatePromises = updates.map((item) =>
      prisma.menuPageWebDB.update({
        where: { id: item.id },
        data: { showOrder: item.showOrder },
      })
    );

    await Promise.all(updatePromises);

    return res.status(200).json({ success: true, message: "ShowOrder updated successfully" });
  } catch (err) {
    console.error("putShowOrder error:", err);
    return res.status(500).json({ success: false, error: "Failed to update showOrder" });
  }
}