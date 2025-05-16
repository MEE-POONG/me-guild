import { GameCategoryDB, GameTypeDB, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface ExtendedGameCategoryDB extends GameCategoryDB {
    gameTypes: GameTypeDB[];  // Embed game types in the response
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            await handleGet(req, res);
        case 'POST':
            await handlePost(req, res);
        case 'DELETE':
            await handleDelete(req, res);
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { page = 1, pageSize = 10, title = "" } = req.query;

    try {
        // Step 1: Fetch categories with pagination
        const gameCategories = await prisma.gameCategoryDB.findMany({
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

        // Extract category IDs to fetch game types
        const categoryIds = gameCategories.map(category => category.id);

        // Step 2: Fetch game types based on category IDs
        const gameTypes = await prisma.gameTypeDB.findMany({
            where: {
                categoryId: { in: categoryIds },
                deleteBy: '', // Only include non-deleted records
            },
        });

        // Step 3: Structure data using ExtendedGameCategoryDB
        const exportDB: ExtendedGameCategoryDB[] = gameCategories.map(category => ({
            ...category,
            gameTypes: gameTypes.filter(gameType => gameType.categoryId === category.id),
        }));

        const totalCategories = await prisma.gameCategoryDB.count({
            where: {
                title: {
                    contains: title as string,
                    mode: 'insensitive',
                },
            },
        });

        // Send the response with structured data and pagination
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
        res.status(500).json({ success: false, error: "Error fetching game categories and types." });
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { title, createdBy, gameTypes } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ success: false, error: "กรุณาระบุชื่อหมวดหมู่" });
    }

    const exists = await prisma.gameCategoryDB.findUnique({ where: { title } });
    if (exists) {
        return res.status(400).json({ success: false, error: "ชื่อหมวดหมู่นี้ถูกใช้แล้ว" });
    }

    try {
        const newCategory = await prisma.gameCategoryDB.create({
            data: {
                title: title.trim(),
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy,
                updatedBy: createdBy,
                deleteBy: '',
            },
        });

        const gameTypesData = Array.isArray(gameTypes)
            ? gameTypes.map((type: any) => ({
                title: type.title,
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy,
                updatedBy: createdBy,
                categoryId: newCategory.id,
                deleteBy: '',
            }))
            : [];

        if (gameTypesData.length > 0) {
            await prisma.gameTypeDB.createMany({
                data: gameTypesData,
            });
        }

        res.status(201).json({ success: true, category: newCategory });
    } catch (error) {
        console.error("Error creating category and game types:", error);
        res.status(500).json({ success: false, error: "Error creating category and game types" });
    }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ success: false, error: "Missing category ID" });
    }

    try {
        // 1. หา gameTypes ที่เกี่ยวข้องกับ category นี้
        const relatedTypes = await prisma.gameTypeDB.findMany({
            where: { categoryId: id },
        });

        const typeIds = relatedTypes.map((t) => t.id);

        // 2. ลบ GameTypeGame ที่เชื่อมโยงกับ GameType เหล่านี้ก่อน
        if (typeIds.length > 0) {
            await prisma.gameTypeGame.deleteMany({
                where: { typeId: { in: typeIds } },
            });
        }

        // 3. ลบ GameTypeDB ที่เกี่ยวข้องกับ category นี้
        await prisma.gameTypeDB.deleteMany({
            where: { categoryId: id },
        });

        // 4. ลบ GameCategoryDB เอง
        await prisma.gameCategoryDB.delete({
            where: { id },
        });

        res.status(200).json({ success: true, message: "ลบหมวดหมู่และข้อมูลที่เกี่ยวข้องแล้ว (hard delete)" });
    } catch (error) {
        console.error("Error in hard delete:", error);
        res.status(500).json({ success: false, error: "ไม่สามารถลบข้อมูลได้" });
    }
}
