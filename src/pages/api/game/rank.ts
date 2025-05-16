import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ ฟังก์ชันหลักสำหรับ API Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            return handleGet(req, res);
        case "POST":
            return handlePost(req, res);
        case "PUT":
            return handlePut(req, res);
        case "DELETE":
            return handleDelete(req, res);
        default:
            return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { gameId } = req.query;

        let whereClause = {};

        if (gameId && typeof gameId === "string") {
            whereClause = {
                gameId: gameId,
            };
        }

        const ranks = await prisma.gameRankDB.findMany({
            where: whereClause,
            orderBy: { number: "asc" },
        });

        return res.status(200).json({ success: true, data: ranks });
    } catch (error) {
        console.error("Error fetching ranks:", error);
        return res.status(500).json({ success: false, error: "Error fetching ranks" });
    }
};

// ✅ เพิ่ม Rank (POST)
const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { gameID, ranks } = req.body;

        if (!gameID || !ranks) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const createdRanks = await Promise.all(
            ranks.map(async (rank: any) => {
                const newRank = await prisma.gameRankDB.create({
                    data: {
                        gameId: gameID,
                        imgRank: rank.imgPreview,
                        nameRank: rank.nameRank,
                        number: rank.number || 1,
                        createdBy: "admin",
                        updatedBy: "admin",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        deleteBy: "",
                    },
                });

                // แปลง BigInt เป็น string
                return { ...newRank, number: newRank.number.toString() };
            })
        );

        return res.status(201).json({ success: true, data: createdRanks });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error creating ranks" });
    }
};


// ✅ แก้ไข Rank (PUT)
const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id, imgRank, nameRank, number, updatedBy } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, error: "ID is required" });
        }

        const updatedRank = await prisma.gameRankDB.update({
            where: { id },
            data: {
                imgRank,
                nameRank,
                number: number,
                updatedBy,
                updatedAt: new Date(),
            },
        });

        return res.status(200).json({ success: true, rank: updatedRank });
    } catch (error) {
        console.error("Error updating rank:", error);
        return res.status(500).json({ success: false, error: "Error updating rank" });
    }
};

// ✅ ลบ Rank (DELETE)
const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, error: "ID is required" });
        }

        await prisma.gameRankDB.delete({
            where: { id },
        });

        return res.status(200).json({ success: true, message: "Rank deleted successfully" });
    } catch (error) {
        console.error("Error deleting rank:", error);
        return res.status(500).json({ success: false, error: "Error deleting rank" });
    }
};

