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
    const { page = 1, pageSize = 10, userId = "" } = req.query;

    try {
        const gameMatches = await prisma.gameMatchDB.findMany({
            where: {
                userId: userId as string,
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalMatches = await prisma.gameMatchDB.count({
            where: {
                userId: userId as string,
            },
        });

        res.status(200).json({
            success: true,
 gameMatches,
            pagination: {
                totalPages: Math.ceil(totalMatches / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalMatches,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching game matches." });
    }
}
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { userId, gameId, rank, selectRankID, channel_id, partyLimit, limitNumber, status, members, createdBy } = req.body;

    try {
        const newMatch = await prisma.gameMatchDB.create({
            data: {
                userId,
                gameId,
                rank,
                selectRankID,
                channel_id,
                partyLimit,
                limitNumber,
                status,
                members,
                createdBy,
                updatedBy: createdBy || '',
                deleteBy: '',
            },
        });

        res.status(201).json({ success: true, data: newMatch });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating game match." });
    }
}
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, userId, gameId, rank, selectRankID, channel_id, partyLimit, limitNumber, status, members, updatedBy } = req.body;

    try {
        const updatedMatch = await prisma.gameMatchDB.update({
            where: { id },
            data: {
                userId,
                gameId,
                rank,
                selectRankID,
                channel_id,
                partyLimit,
                limitNumber,
                status,
                members,
                updatedBy,
            },
        });

        res.status(200).json({ success: true, data: updatedMatch });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating game match." });
    }
}
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.gameMatchDB.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting game match." });
    }
}
