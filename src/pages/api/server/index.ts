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

// Fetch servers (GET)
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { page = 1, pageSize = 10, discordId = "", ownerId = "", openBot } = req.query;

    try {
        const servers = await prisma.serverDB.findMany({
            where: {
                // discordId: discordId ? (discordId as string) : undefined,
                ownerId: ownerId ? (ownerId as string) : undefined,
                openBot: openBot !== undefined ? openBot === 'true' : undefined,
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: { createdAt: 'desc' },
        });

        const totalServers = await prisma.serverDB.count({
            where: {
                // discordId: discordId ? (discordId as string) : undefined,
                ownerId: ownerId ? (ownerId as string) : undefined,
                openBot: openBot !== undefined ? openBot === 'true' : undefined,
            },
        });

        res.status(200).json({
            success: true,
            data: servers,
            pagination: {
                totalPages: Math.ceil(totalServers / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalServers,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching server records." });
    }
}

// Create a new server (POST)
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { serverId, serverName, ownerId, openUntilAt } = req.body;

    if (!serverId || !serverName || !ownerId) {
        return res.status(400).json({ success: false, error: "Server ID, Server Name, and Owner ID are required." });
    }

    try {
        const newServer = await prisma.serverDB.create({
            data: {
                serverId,
                serverName,
                ownerId,
                openUntilAt: openUntilAt ? new Date(openUntilAt) : new Date(), // ✅ ตรวจสอบว่ามีค่าไหม
                openBot: false, // ค่าเริ่มต้น
                createdAt: new Date(),  // ✅ เพิ่มค่า createdAt
                updatedAt: new Date(),  // ✅ เพิ่มค่า updatedAt
            },
        });

        res.status(201).json({ success: true, data: newServer });
    } catch (error) {
        console.error("Error creating server:", error);
        res.status(500).json({ success: false, error: "Error creating server record." });
    }
}


// Update a server (PUT)
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, openBot } = req.body;

    if (!id || openBot === undefined) {
        return res.status(400).json({ success: false, error: "ID and openBot are required for updating." });
    }

    try {
        const server = await prisma.serverDB.findUnique({ where: { id } });

        if (!server) {
            return res.status(404).json({ success: false, error: "Server not found." });
        }

        // Handle openBot logic
        // let updatedStartDate = server.startDate;
        // if (openBot === true && !server.startDate) {
        //     updatedStartDate = new Date(); // Set startDate for the first time
        // }

        const updatedServer = await prisma.serverDB.update({
            where: { id },
            data: {
                openBot,
                // startDate: updatedStartDate,
            },
        });

        res.status(200).json({ success: true, data: updatedServer });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating server record." });
    }
}

// Delete a server (DELETE)
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, error: "ID is required for deletion." });
    }

    try {
        await prisma.serverDB.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting server record." });
    }
}
