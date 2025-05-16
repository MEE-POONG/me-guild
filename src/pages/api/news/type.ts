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
    const { page = 1, pageSize = 10, categoryId = "" } = req.query;

    try {
        const newsTypes = await prisma.newsTypeDB.findMany({
            where: {
                categoryId: categoryId ? categoryId as string : undefined,
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalTypes = await prisma.newsTypeDB.count({
            where: {
                categoryId: categoryId ? categoryId as string : undefined,
            },
        });

        res.status(200).json({
            success: true,
            data: newsTypes,
            pagination: {
                totalPages: Math.ceil(totalTypes / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalTypes,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching news types." });
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { title, createdBy, categoryId } = req.body;

    try {
        const newType = await prisma.newsTypeDB.create({
            data: {
                title,
                createdBy,
                categoryId,
                createdAt: new Date(),  // ✅ เพิ่มค่า createdAt
                updatedAt: new Date(),  // ✅ เพิ่มค่า updatedAt
                updatedBy: createdBy || '',
                deleteBy: '',
            },
        });

        res.status(201).json({ success: true, data: newType });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating news type." });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, title, updatedBy, categoryId } = req.body;

    try {
        const updatedType = await prisma.newsTypeDB.update({
            where: { id },
            data: {
                title,
                updatedBy,
                categoryId,
            },
        });

        res.status(200).json({ success: true, data: updatedType });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating news type." });
    }
}
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.newsTypeDB.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting news type." });
    }
}
