import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            await handleGet(req, res);
            break;
        case 'POST':
            await handlePost(req, res);
            break;
        case 'PUT':
            await handlePut(req, res);
            break;
        case 'DELETE':
            await handleDelete(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { page = 1, pageSize = 10, gameId = "", typeId = "" } = req.query;

    try {
        const gameTypeGames = await prisma.gameTypeGame.findMany({
            where: {
                gameId: gameId ? gameId as string : undefined,
                typeId: typeId ? typeId as string : undefined,
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalGameTypeGames = await prisma.gameTypeGame.count({
            where: {
                gameId: gameId ? gameId as string : undefined,
                typeId: typeId ? typeId as string : undefined,
            },
        });

        res.status(200).json({
            success: true,
            gameTypeGames,
            pagination: {
                totalPages: Math.ceil(totalGameTypeGames / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalGameTypeGames,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching game type records." });
    }
}
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { gameId, typeId, createdBy } = req.body;

    try {
        const newGameTypeGame = await prisma.gameTypeGame.create({
            data: {
                gameId,
                typeId,
                createdAt: new Date(),  // ✅ เพิ่มค่า createdAt
                updatedAt: new Date(),  // ✅ เพิ่มค่า updatedAt
                createdBy,
                updatedBy: createdBy || '',
                deleteBy: '',
            },
        });

        res.status(201).json({ success: true, data: newGameTypeGame });
    } catch (error) {
        console.error("Error creating game type game record:", error);
        res.status(500).json({ success: false, error: "Error creating game type game record." });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { gameId, typeIds, updatedBy } = req.body; // gameId is List.id, typeIds is selectType

    try {
        // 1. ลบข้อมูลที่ typeId ไม่มีใน selectType
        await prisma.gameTypeGame.deleteMany({
            where: {
                gameId,
                typeId: {
                    notIn: typeIds, // ลบข้อมูลที่ typeId ไม่มีใน selectType
                },
            },
        });

        // 2. ดึงรายการ typeId ที่มีอยู่แล้วใน GameTypeGame
        const existingGameTypeGames = await prisma.gameTypeGame.findMany({
            where: { gameId },
            select: { typeId: true },
        });

        const existingTypeIds = existingGameTypeGames.map((entry) => entry.typeId);

        // 3. สร้างรายการ typeId ใหม่ที่ยังไม่มีใน GameTypeGame
        const newTypeIds = typeIds.filter((typeId: any) => !existingTypeIds.includes(typeId));

        // 4. เพิ่มข้อมูลใหม่
        if (newTypeIds.length > 0) {
            await prisma.gameTypeGame.createMany({
                data: newTypeIds.map((typeId: any) => ({
                    gameId,
                    typeId,
                    createdBy: updatedBy,
                    updatedBy,
                    deleteBy: ''
                })),
            });
        }

        res.status(200).json({ success: true, message: 'GameTypeGame records updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error updating GameTypeGame records.' });
    }
}
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.gameTypeGame.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting game type game record." });
    }
}
