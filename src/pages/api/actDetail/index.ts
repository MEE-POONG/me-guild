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

// Fetch all activities (GET)
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { page = 1, pageSize = 10, keyword = "", typeKeyword = "" } = req.query;

    try {
        const activities = await prisma.actDetailDB.findMany({
            where: {
                title: {
                    contains: keyword as string,
                    mode: 'insensitive',
                },
                type: {
                    contains: typeKeyword as string,
                    mode: 'insensitive',
                },
                // deleteBy: null, // Only fetch non-deleted entries
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalActivities = await prisma.actDetailDB.count({
            where: {
                title: {
                    contains: keyword as string,
                    mode: 'insensitive',
                },
                type: {
                    contains: typeKeyword as string,
                    mode: 'insensitive',
                },
                // deleteBy: null,
            },
        });

        res.status(200).json({
            success: true,
            data: activities,
            pagination: {
                totalPages: Math.ceil(totalActivities / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalActivities,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching activities." });
    }
}

// Create a new activity (POST)
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { title, point, type, img, startdate, enddate, description, disname, dislink, createdBy, actTypeId } = req.body;

    try {
        const newActivity = await prisma.actDetailDB.create({
            data: {
                title,
                point,
                type,
                img,
                startdate,
                enddate,
                description,
                disname,
                dislink,
                createdAt: new Date(),  // ✅ เพิ่มค่า createdAt
                updatedAt: new Date(),  // ✅ เพิ่มค่า updatedAt
                createdBy,
                updatedBy: createdBy || '',
                deleteBy: '',
                actTypeId: actTypeId || "", // ✅ ตรวจสอบว่ามี actTypeId หรือไม่
            },
        });

        res.status(201).json({ success: true, data: newActivity });
    } catch (error) {
        console.error("Error creating activity:", error);
        res.status(500).json({ success: false, error: "Error creating activity entry." });
    }
}

// Update an existing activity (PUT)
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, title, point, type, img, startdate, enddate, description, disname, dislink, updatedBy } = req.body;

    try {
        const updatedActivity = await prisma.actDetailDB.update({
            where: { id },
            data: {
                title,
                point,
                type,
                img,
                startdate,
                enddate,
                description,
                disname,
                dislink,
                updatedBy,
            },
        });

        res.status(200).json({ success: true, data: updatedActivity });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating activity." });
    }
}

// Soft delete an activity (DELETE)
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.actDetailDB.delete({
            where: { id },
        });

        res.status(204).end(); // Use 204 No Content for successful deletion with no response body
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ success: false, error: "Error deleting blog." });
    }
}
