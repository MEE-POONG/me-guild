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
    const { page = 1, pageSize = 10, title = "" } = req.query;

    try {
        const newsCategories = await prisma.newsCategoryDB.findMany({
            where: {
                title: title ? title as string : undefined,
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalCategories = await prisma.newsCategoryDB.count({
            where: {
                title: title ? title as string : undefined,
            },
        });

        res.status(200).json({
            success: true,
            data: newsCategories,
            pagination: {
                totalPages: Math.ceil(totalCategories / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalCategories,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching news categories." });
    }
}
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { title, createdBy } = req.body;

    try {
        const newCategory = await prisma.newsCategoryDB.create({
            data: {
                title,
                createdAt: new Date(),  // ✅ เพิ่มค่า createdAt
                updatedAt: new Date(),  // ✅ เพิ่มค่า updatedAt
                createdBy,
                updatedBy: createdBy || '',
                deleteBy: '',
            },
        });

        res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
        console.error("Error creating news category:", error);
        res.status(500).json({ success: false, error: "Error creating news category." });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, title, updatedBy } = req.body;

    try {
        const updatedCategory = await prisma.newsCategoryDB.update({
            where: { id },
            data: {
                title,
                updatedBy,
            },
        });

        res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating news category." });
    }
}
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.newsCategoryDB.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting news category." });
    }
}
