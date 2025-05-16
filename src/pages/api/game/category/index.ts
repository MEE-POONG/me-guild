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
        const exportDB = await prisma.gameCategoryDB.findMany({
            where: {
                title: {
                    contains: title as string,
                    mode: 'insensitive',
                },
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalCategories = await prisma.gameCategoryDB.count({
            where: {
                title: {
                    contains: title as string,
                    mode: 'insensitive',
                },
            },
        });

        res.status(200).json({
            success: true,
            exportDB,
            pagination: {
                totalPages: Math.ceil(totalCategories / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalCategories,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching game categories." });
    }
}
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { title, createdBy } = req.body;

    try {
        // ✅ เช็คว่าชื่อซ้ำไหมก่อน
        const existingCategory = await prisma.gameCategoryDB.findUnique({
            where: { title },
        });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                error: "มีหมวดหมู่ชื่อนี้อยู่แล้ว กรุณาใช้ชื่ออื่น",
            });
        }

        // ✅ ถ้าไม่ซ้ำ → สร้างใหม่ได้
        const newCategory = await prisma.gameCategoryDB.create({
            data: {
                title,
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy,
                updatedBy: createdBy || '',
                deleteBy: '',
            },
        });

        res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
        console.error("error : ", error);
        res.status(500).json({ success: false, error: "Error creating game category." });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, title, updatedBy } = req.body;

    try {
        const updatedCategory = await prisma.gameCategoryDB.update({
            where: { id },
            data: {
                title,
                updatedBy,
            },
        });

        res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating game category." });
    }
}
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.gameCategoryDB.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting game category." });
    }
}
