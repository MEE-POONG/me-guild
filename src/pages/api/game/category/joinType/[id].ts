import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            await handleGet(req, res);
            break;
       
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ success: false, error: "ID is required and must be a string." });
    }

    try {
        // Step 1: Fetch the GameCategoryDB record by ID
        const category = await prisma.gameCategoryDB.findUnique({
            where: { id: id },
        });

        if (!category) {
            return res.status(404).json({ success: false, error: "Category not found." });
        }

        // Step 2: Fetch related GameTypeDB entries using categoryId
        const listDB = await prisma.gameTypeDB.findMany({
            where: {
                categoryId: id,
                deleteBy: '', // Only include non-deleted records
            },
        });

        // Combine the category with its game types
        const exportDB = {
            ...category,
            listDB,
        };

        res.status(200).json({ success: true,  exportDB });
    } catch (error) {
        console.error("Error fetching category and game types:", error);
        res.status(500).json({ success: false, error: "Error fetching category and game types." });
    }
}
