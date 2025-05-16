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
    const { page = 1, pageSize = 10, userId = "", gameId = "" } = req.query;

    try {
        const userGameRanks = await prisma.userGameRank.findMany({
            where: {
                // userId: userId ? userId as string : undefined,
                gameId: gameId ? gameId as string : undefined,
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalGameRanks = await prisma.userGameRank.count({
            where: {
                // userId: userId ? userId as string : undefined,
                gameId: gameId ? gameId as string : undefined,
            },
        });

        res.status(200).json({
            success: true,
 userGameRanks,
            pagination: {
                totalPages: Math.ceil(totalGameRanks / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalGameRanks,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching user game rank records." });
    }
}
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { gameId, userId, gameRankId, invitation, createdBy } = req.body;

    try {
        const newUserGameRank = await prisma.userGameRank.create({
            data: {
                gameId,
                userId: typeof userId === 'string' ? JSON.parse(userId) : userId, // ✅ แปลง userId เป็น JSON ถ้าจำเป็น
                gameRankId,
                invitation: invitation ?? false, // ✅ กำหนดค่าเริ่มต้นเป็น false ถ้าไม่มีค่า
                createdBy,
                createdAt: new Date(), // ✅ เพิ่มค่า createdAt
                updatedAt: new Date(), // ✅ เพิ่มค่า updatedAt
                updatedBy: createdBy || '',
                deleteBy: '',
            },
        });
        

        res.status(201).json({ success: true, data: newUserGameRank });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating user game rank record." });
    }
}
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, gameId, userId, gameRankId, invitation, updatedBy } = req.body;

    try {
        const updatedUserGameRank = await prisma.userGameRank.update({
            where: { id },
            data: {
                gameId,
                userId,
                gameRankId,
                invitation,
                updatedBy,
            },
        });

        res.status(200).json({ success: true, data: updatedUserGameRank });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating user game rank record." });
    }
}
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.userGameRank.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting user game rank record." });
    }
}
