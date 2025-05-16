import { GameCategoryDB, GameTypeDB, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'POST':
            await handlePost(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
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
                    createdAt: new Date(),  // ✅ เพิ่มค่า createdAt
                    updatedAt: new Date(),  // ✅ เพิ่มค่า updatedAt
                    categoryId: newCategory.id,
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
