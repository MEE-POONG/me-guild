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

// Fetch all news (GET)
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { page = 1, pageSize = 10, keyword = "" } = req.query;

    try {
        const newsDB = await prisma.newsUpdateDB.findMany({
            where: {
                title: { contains: keyword as string, mode: 'insensitive' },
                deleteBy: '', // Soft deletion filter
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: { createdAt: 'desc' },
            include: {
                newsTypeNews: {  // ✅ ใช้ `newsTypeNews` แทน `NewsTypeNews`
                    include: {
                        newsTypeDB: true  // ✅ Prisma ใช้ field `newsType`
                    }
                }
            },
        });

        const totalNews = await prisma.newsUpdateDB.count({
            where: {
                title: { contains: keyword as string, mode: 'insensitive' },
                deleteBy: '',
            },
        });

        res.status(200).json({
            success: true,
            data: newsDB,
            pagination: {
                totalPages: Math.ceil(totalNews / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalNews,
            },
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: "Error fetching news." });
    }
}

// Create a new news (POST)
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { title, img, description, creditlink, createdBy, newsTypeNews } = req.body;

    if (!title || !description ) {
        return res.status(400).json({ success: false, error: "Title, description, and creditlink are required." });
    }

    try {
        const newNews = await prisma.newsUpdateDB.create({
            data: {
                title,
                img,
                description,
                creditlink,
                createdBy,
                createdAt: new Date(),  // ✅ เพิ่มค่า createdAt
                updatedAt: new Date(),  // ✅ เพิ่มค่า updatedAt
                updatedBy: createdBy || '',
                deleteBy: '',
                newsTypeNews: {  // ✅ ใช้ชื่อที่ถูกต้อง
                    connect: newsTypeNews?.map((type: { id: string }) => ({ id: type.id })),
                },
            },
        });

        res.status(201).json({ success: true, data: newNews });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating new news." });
    }
}

// Update an existing news (PUT)
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, title, img, description, creditlink, updatedBy, newsTypeNews } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, error: "ID is required for updating." });
    }

    try {
        const updatedNews = await prisma.newsUpdateDB.update({
            where: { id },
            data: {
                title,
                img,
                description,
                creditlink,
                updatedBy,
                newsTypeNews: {  // ✅ ใช้ชื่อฟิลด์ที่ถูกต้อง
                    set: newsTypeNews?.map((type: { id: string }) => ({ id: type.id })),
                },
            },
        });

        res.status(200).json({ success: true, data: updatedNews });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating news." });
    }
}


// Soft delete a news item (DELETE)
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id, deleteBy } = req.body;

    if (!id || !deleteBy) {
        return res.status(400).json({ success: false, error: "ID and deleteBy are required for deletion." });
    }

    try {
        const deletedNews = await prisma.newsUpdateDB.update({
            where: { id },
            data: { deleteBy }, // Soft delete by setting deleteBy field
        });

        res.status(200).json({ success: true, data: deletedNews });
    } catch (error) {
        console.error("Error deleting news:", error);
        res.status(500).json({ success: false, error: "Error deleting news." });
    }
}
