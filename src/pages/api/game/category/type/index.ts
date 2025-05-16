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
        const exportDB = await prisma.gameTypeDB.findMany({
            where: {
                categoryId: categoryId ? (categoryId as string) : undefined,
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalGameTypes = await prisma.gameTypeDB.count({
            where: {
                categoryId: categoryId ? (categoryId as string) : undefined,
            },
        });

        res.status(200).json({
            success: true,
            exportDB,
            pagination: {
                totalPages: Math.ceil(totalGameTypes / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalGameTypes,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching game types." });
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const categories: any = req.body;

    if (!categories || !Array.isArray(categories)) {
        return res.status(400).json({ success: false, error: 'Invalid input data format.' });
    }

    try {
        for (const category of categories) {
            const newCategory = await prisma.gameCategoryDB.create({
                data: {
                    title: category.title,
                    createdAt: new Date(),  // ✅ เพิ่มค่า createdAt
                    updatedAt: new Date(),  // ✅ เพิ่มค่า updatedAt
                    createdBy: category.createdBy || 'system',
                    updatedBy: category.updatedBy || 'system',
                    deleteBy: category.deleteBy || '',
                },
            });

            if (category.gameTypes && Array.isArray(category.gameTypes)) {
                const gameTypesData = category.gameTypes.map((gameType: any) => ({
                    title: gameType.title,
                    categoryId: newCategory.id,  // ✅ เพิ่ม categoryId ให้ Prisma
                    createdAt: new Date(),  // ✅ เพิ่มค่า createdAt
                    updatedAt: new Date(),  // ✅ เพิ่มค่า updatedAt
                    createdBy: gameType.createdBy || 'system',
                    updatedBy: gameType.updatedBy || 'system',
                    deleteBy: gameType.deleteBy || '',
                }));

                await prisma.gameTypeDB.createMany({
                    data: gameTypesData,
                });
            }
        }

        res.status(201).json({ success: true, message: 'Categories and game types created successfully.' });
    } catch (error) {
        console.error('Error creating categories and game types:', error);
        res.status(500).json({ success: false, error: 'Error creating categories and game types.' });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, title, updatedBy, categoryId } = req.body;

    try {
        const updatedGameType = await prisma.gameTypeDB.update({
            where: { id },
            data: {
                title,
                updatedBy,
                categoryId,
            },
        });

        res.status(200).json({ success: true, data: updatedGameType });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating game type." });
    }
}
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.gameTypeDB.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting game type." });
    }
}
