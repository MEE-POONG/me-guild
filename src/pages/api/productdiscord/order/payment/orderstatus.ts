import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "PUT":
        return await putOrderStatus(req, res);
      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// ✅ PUT
async function putOrderStatus(req: NextApiRequest, res: NextApiResponse) {
  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ success: false, message: "Missing id or status" });
  }

  try {
    const updated = await prisma.orderDB.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error("❌ updateOrderStatus error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }

}
