import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ ฟังก์ชันหลักสำหรับ API Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "PUT":
            return handlePut(req, res);
        default:
            return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}

// ✅ แก้ไข Rank (PUT)
const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id, number, updatedBy } = req.body;

        if (!id || typeof number !== 'number') {
            return res.status(400).json({ success: false, error: 'Missing or invalid id/number' });
        }

        const updated = await prisma.gameRankDB.update({
            where: { id },
            data: {
                number,
                updatedBy: updatedBy || 'system',
                updatedAt: new Date(),
            },
        });

        return res.status(200).json({ success: true, data: updated });
    } catch (error) {
        console.error('Error updating rank number:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};