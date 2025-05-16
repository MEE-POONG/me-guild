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
    const { page = 1, pageSize = 10, discord_id = "" } = req.query;

    try {
        const records = await prisma.checkOnlineDB.findMany({
            where: {
                discord_id: discord_id as string,
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalRecords = await prisma.checkOnlineDB.count({
            where: {
                discord_id: discord_id as string,
            },
        });

        res.status(200).json({
            success: true,
 records,
            pagination: {
                totalPages: Math.ceil(totalRecords / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalRecords,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching records." });
    }
}
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { discord_id, checkIn, createdBy } = req.body;

    try {
        const newCheckIn = await prisma.checkOnlineDB.create({
            data: {
                discord_id,
                checkIn: checkIn ? new Date(checkIn) : new Date(),
                createdBy,
                updatedBy: createdBy || '',
                deleteBy: '',
            },
        });

        res.status(201).json({ success: true, data: newCheckIn });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating check-in record." });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, checkOut, updatedBy } = req.body;

    try {
        // Fetch the check-in record to calculate total online time
        const checkInRecord = await prisma.checkOnlineDB.findUnique({
            where: { id },
        });

        if (!checkInRecord) {
            return res.status(404).json({ success: false, error: "Check-in record not found." });
        }

        // Calculate the total time online in minutes
        const totalOnlineTime = Math.floor((new Date(checkOut).getTime() - new Date(checkInRecord.checkIn).getTime()) / (1000 * 60));

        const updatedRecord = await prisma.checkOnlineDB.update({
            where: { id },
            data: {
                checkOut: new Date(checkOut),
                totalOnlineTime,
                updatedBy,
            },
        });

        res.status(200).json({ success: true, data: updatedRecord });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating check-out record." });
    }
}
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.checkOnlineDB.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting check-in record." });
    }
}
