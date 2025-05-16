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

// ✅ GET
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { page = 1, pageSize = 10, keyword = "" } = req.query;

    try {
        const roles = await prisma.roleDiscord.findMany({
            where: {
                name: {
                    contains: keyword as string,
                    mode: 'insensitive'
                },
                deleteBy: ""
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: { createdAt: 'desc' },
        });

        const total = await prisma.roleDiscord.count({
            where: {
                name: {
                    contains: keyword as string,
                    mode: 'insensitive'
                },
                deleteBy: ""
            },
        });

        res.status(200).json({
            success: true,
            data: roles,
            pagination: {
                totalPages: Math.ceil(total / Number(pageSize)),
                currentPage: Number(page),
                totalItems: total
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching RoleDiscord." });
    }
}

// ✅ POST
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { name, img, roldID, discordServerID, type, createdBy } = req.body;

    if (!name || !roldID || !discordServerID) {
        return res.status(400).json({ success: false, error: "Name, roldID, and discordServerID are required." });
    }

    try {
        const newRole = await prisma.roleDiscord.create({
            data: {
                name,
                img,
                roldID,
                discordServerID,
                type,
                createdBy,
                updatedBy: createdBy || '',
                deleteBy: '',
                createdAt: new Date(),
            },
        });

        res.status(201).json({ success: true, data: newRole });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating RoleDiscord." });
    }
}

// ✅ PUT
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, name, img, roldID, discordServerID, type, updatedBy } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, error: "ID is required for updating." });
    }

    try {
        const updatedRole = await prisma.roleDiscord.update({
            where: { id },
            data: {
                name,
                img,
                roldID,
                discordServerID,
                type,
                updatedBy,
            },
        });

        res.status(200).json({ success: true, data: updatedRole });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating RoleDiscord." });
    }
}

// ✅ DELETE (Soft delete)
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id, deleteBy } = req.body;

    if (!id || !deleteBy) {
        return res.status(400).json({ success: false, error: "ID and deleteBy are required for deletion." });
    }

    try {
        const deletedRole = await prisma.roleDiscord.update({
            where: { id },
            data: { deleteBy },
        });

        res.status(200).json({ success: true, data: deletedRole });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting RoleDiscord." });
    }
}
