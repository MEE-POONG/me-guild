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
    const { page = 1, pageSize = 10, userId = "", guildId = "" } = req.query;

    try {
        const inviteRequests = await prisma.guildInviteRequest.findMany({
            where: {
                userId: userId ? userId as string : undefined,
                guildId: guildId ? guildId as string : undefined,
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
           
        });

        const totalRequests = await prisma.guildInviteRequest.count({
            where: {
                userId: userId ? userId as string : undefined,
                guildId: guildId ? guildId as string : undefined,
            },
        });

        res.status(200).json({
            success: true,
 inviteRequests,
            pagination: {
                totalPages: Math.ceil(totalRequests / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalRequests,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching invite requests." });
    }
}
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { userId, guildId, createdBy } = req.body;

    try {
        const newInviteRequest = await prisma.guildInviteRequest.create({
            data: {
                userId,
                guildId,
            },
        });

        res.status(201).json({ success: true, data: newInviteRequest });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating invite request." });
    }
}
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, userId, guildId, updatedBy } = req.body;

    try {
        const updatedInviteRequest = await prisma.guildInviteRequest.update({
            where: { id },
            data: {
                userId,
                guildId,
            },
        });

        res.status(200).json({ success: true, data: updatedInviteRequest });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating invite request." });
    }
}
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.guildInviteRequest.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting invite request." });
    }
}
