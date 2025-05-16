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
    const { page = 1, pageSize = 10, gameId = "" } = req.query;

    try {
        const gameConditions = await prisma.gameConditionMatchDB.findMany({
            where: {
                gameId: gameId ? gameId as string : undefined,
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalConditions = await prisma.gameConditionMatchDB.count({
            where: {
                gameId: gameId ? gameId as string : undefined,
            },
        });

        res.status(200).json({
            success: true,
 gameConditions,
            pagination: {
                totalPages: Math.ceil(totalConditions / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalConditions,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching condition game match records." });
    }
}
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { maxParty, limitNumber, createdBy, gameId } = req.body;

    try {
        const newCondition = await prisma.gameConditionMatchDB.create({
            data: {
                maxParty,
                limitNumber: limitNumber || 0,
                createdBy,
                gameId,
                updatedBy: createdBy || '',
                deleteBy: '',
            },
        });

        res.status(201).json({ success: true, data: newCondition });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating condition game match record." });
    }
}
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, maxParty, limitNumber, updatedBy, gameId } = req.body;

    try {
        const updatedCondition = await prisma.gameConditionMatchDB.update({
            where: { id },
            data: {
                maxParty,
                limitNumber,
                updatedBy,
                gameId,
            },
        });

        res.status(200).json({ success: true, data: updatedCondition });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating condition game match record." });
    }
}
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.gameConditionMatchDB.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting condition game match record." });
    }
}
