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
    const { page = 1, pageSize = 10, guild_leader = "" } = req.query;

    try {
        const guilds = await prisma.guildDB.findMany({
            where: {
                guild_leader: guild_leader ? guild_leader as string : undefined,
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                guild_level: 'desc',
            },
        });

        const totalGuilds = await prisma.guildDB.count({
            where: {
                guild_leader: guild_leader ? guild_leader as string : undefined,
            },
        });

        res.status(200).json({
            success: true,
            guilds,
            pagination: {
                totalPages: Math.ceil(totalGuilds / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalGuilds,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching guilds." });
    }
}
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { guild_name, guild_level, guild_copper, guild_size, guild_roleId, guild_leader, Logo, createdBy } = req.body;

    try {
        const newGuild = await prisma.guildDB.create({
            data: {
                guild_name,
                guild_level: guild_level || 1,
                guild_copper: guild_copper || 0,
                guild_size: guild_size || 5,
                guild_roleId,
                guild_leader,
                Logo: Logo || '',
            },
        });

        res.status(201).json({ success: true, data: newGuild });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating guild." });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, guild_name, guild_level, guild_copper, guild_size, guild_roleId, guild_leader, Logo, updatedBy } = req.body;

    try {
        const updatedGuild = await prisma.guildDB.update({
            where: { id },
            data: {
                guild_name,
                guild_level,
                guild_copper,
                guild_size,
                guild_roleId,
                guild_leader,
                Logo,
            },
        });

        res.status(200).json({ success: true, data: updatedGuild });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating guild." });
    }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.guildDB.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting guild." });
    }
}
