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
    const { page = 1, pageSize = 10, game_name = "" } = req.query;

    try {
        const games = await prisma.gameOnlineDB.findMany({
            where: {
                game_name: {
                    contains: game_name as string,
                    mode: 'insensitive',
                },
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalGames = await prisma.gameOnlineDB.count({
            where: {
                game_name: {
                    contains: game_name as string,
                    mode: 'insensitive',
                },
            },
        });

        res.status(200).json({
            success: true,
            games,
            pagination: {
                totalPages: Math.ceil(totalGames / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalGames,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching online games." });
    }
}
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { logo, game_name, partyLimit, ranking, numberMatch, createdBy } = req.body;

    try {
        const newGame = await prisma.gameOnlineDB.create({
            data: {
                logo,
                game_name,
                partyLimit,
                ranking,
                numberMatch,
                createdBy,
                updatedBy: createdBy || '',
                deleteBy: '',
                createdAt: new Date(), // ✅ เพิ่ม createdAt
                updatedAt: new Date(), // ✅ เพิ่ม updatedAt
            },
        });

        res.status(201).json({ success: true, data: newGame });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating online game." });
    }
}
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, logo, game_name, partyLimit, ranking, numberMatch, updatedBy } = req.body;

    try {
        const updatedGame = await prisma.gameOnlineDB.update({
            where: { id },
            data: {
                logo,
                game_name,
                partyLimit,
                ranking,
                numberMatch,
                updatedBy,
                updatedAt: new Date(), // ✅ เพิ่ม updatedAt
            },
        });

        res.status(200).json({ success: true, data: updatedGame });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating online game." });
    }
}
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.gameOnlineDB.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting online game." });
    }
}
