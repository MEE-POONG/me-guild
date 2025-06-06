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

// Fetch all blogs (GET)
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { page = 1, pageSize = 10, keyword = "", typeKeyword = "" } = req.query;

    try {
        const blogs = await prisma.blogDB.findMany({
            where: {
                title: {
                    contains: keyword as string,
                    mode: 'insensitive',
                }
                // deleteBy: null, // Only fetch non-deleted entries
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalBlogs = await prisma.blogDB.count({
            where: {
                title: {
                    contains: keyword as string,
                    mode: 'insensitive',
                },
                // deleteBy: null,
            },
        });

        res.status(200).json({
            success: true,
            data: blogs,
            pagination: {
                totalPages: Math.ceil(totalBlogs / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalBlogs,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching activities." });
    }
}

// Create a new blog (POST)
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { title, img, video, description, creditlink, createdBy } = req.body;

    try {
        const newBlog = await prisma.blogDB.create({
            data: {
                title,
                img,
                video,
                description,
                creditlink,
                createdAt: new Date(),  // ✅ เพิ่มค่า createdAt
                updatedAt: new Date(),  // ✅ เพิ่มค่า updatedAt
                createdBy,
                updatedBy: createdBy || '',
                deleteBy: '',
            },
        });

        res.status(201).json({ success: true, data: newBlog });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating new blog." });
    }
}

// Update an existing blog (PUT)
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, title, img, video, description, creditlink, updatedBy } = req.body;

    try {
        const updatedBlogs = await prisma.blogDB.update({
            where: { id },
            data: {
                title,
                img,
                video,
                description,
                creditlink,
                updatedBy,
            },
        });

        res.status(200).json({ success: true, data: updatedBlogs });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating blog." });
    }
}

// Hard delete a blog (DELETE)
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.blogDB.delete({
            where: { id },
        });

        res.status(204).end(); // Use 204 No Content for successful deletion with no response body
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ success: false, error: "Error deleting blog." });
    }
}