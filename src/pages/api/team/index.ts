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
    const { page = 1, pageSize = 10, teamName = "" } = req.query;

    try {
        const teams = await prisma.teamDB.findMany({
            where: {
                teamName: teamName ? { contains: teamName as string, mode: 'insensitive' } : undefined,
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalTeams = await prisma.teamDB.count({
            where: {
                teamName: teamName ? { contains: teamName as string, mode: 'insensitive' } : undefined,
            },
        });

        res.status(200).json({
            success: true,
 teams,
            pagination: {
                totalPages: Math.ceil(totalTeams / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalTeams,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching teams." });
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { teamName, members, represent, createdBy } = req.body;

    try {
        const newTeam = await prisma.teamDB.create({
            data: {
                teamName,
                represent,
                members,
                TeamLeader: 'default_leader', // Replace with the appropriate value
                createdBy,
                updatedBy: createdBy || '',
                deleteBy: '',
            },
        });

        res.status(201).json({ success: true, data: newTeam });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating team record." });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, teamName, members, represent, updatedBy } = req.body;

    try {
        const updatedTeam = await prisma.teamDB.update({
            where: { id },
            data: {
                teamName,
                members,
                represent,
                updatedBy,
            },
        });

        res.status(200).json({ success: true, data: updatedTeam });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating team record." });
    }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.teamDB.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting team record." });
    }
}
