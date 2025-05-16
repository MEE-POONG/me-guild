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
    const { page = 1, pageSize = 10, ownerId = "", guildName = "" } = req.query;

    try {
        const guildCreateReports = await prisma.guildCreateReport.findMany({
            where: {
                ownerId: ownerId ? ownerId as string : undefined,
                guildName: guildName ? guildName as string : undefined,
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),

        });

        const totalReports = await prisma.guildCreateReport.count({
            where: {
                ownerId: ownerId ? ownerId as string : undefined,
                guildName: guildName ? guildName as string : undefined,
            },
        });

        res.status(200).json({
            success: true,
 guildCreateReports,
            pagination: {
                totalPages: Math.ceil(totalReports / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalReports,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching guild create reports." });
    }
}
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { ownerId, channelId, messageId, guildName, members } = req.body;

    try {
        const newReport = await prisma.guildCreateReport.create({
            data: {
                ownerId,
                channelId,
                messageId,
                guildName,
                members,
            },
        });

        res.status(201).json({ success: true, data: newReport });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating guild create report." });
    }
}
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, ownerId, channelId, messageId, guildName, members } = req.body;

    try {
        const updatedReport = await prisma.guildCreateReport.update({
            where: { id },
            data: {
                ownerId,
                channelId,
                messageId,
                guildName,
                members,
            },
        });

        res.status(200).json({ success: true, data: updatedReport });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating guild create report." });
    }
}
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.guildCreateReport.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting guild create report." });
    }
}
