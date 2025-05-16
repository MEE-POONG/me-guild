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
    const { page = 1, pageSize = 10, newsUpdateId = "", typeId = "" } = req.query;

    try {
        const newsTypeNews = await prisma.newsTypeNews.findMany({
            where: {
                newsUpdateId: newsUpdateId ? newsUpdateId as string : undefined,
                typeId: typeId ? typeId as string : undefined,
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalRecords = await prisma.newsTypeNews.count({
            where: {
                newsUpdateId: newsUpdateId ? newsUpdateId as string : undefined,
                typeId: typeId ? typeId as string : undefined,
            },
        });

        res.status(200).json({
            success: true,
            data: newsTypeNews,
            pagination: {
                totalPages: Math.ceil(totalRecords / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalRecords,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching news type news records." });
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { newsUpdateId, typeId, createdBy } = req.body;

    try {
        const newRecord = await prisma.newsTypeNews.create({
            data: {
                newsUpdateId,
                typeId,
                createdBy,
                createdAt: new Date(),  // ✅ เพิ่มค่า createdAt
                updatedAt: new Date(),  // ✅ เพิ่มค่า updatedAt
                updatedBy: createdBy || '',
                deleteBy: '',
                newsUpdateDB: { connect: { id: newsUpdateId } }, // ✅ เชื่อมโยงกับ NewsUpdateDB
                newsTypeDB: { connect: { id: typeId } }, // ✅ เชื่อมโยงกับ NewsTypeDB
            },
        });
        

        res.status(201).json({ success: true, data: newRecord });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating news type news record." });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, newsUpdateId, typeId, updatedBy } = req.body;

    try {
        const updatedRecord = await prisma.newsTypeNews.update({
            where: { id },
            data: {
                newsUpdateId,
                typeId,
                updatedBy,
            },
        });

        res.status(200).json({ success: true, data: updatedRecord });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating news type news record." });
    }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.newsTypeNews.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting news type news record." });
    }
}
