
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
    const { page = 1, pageSize = 10, userID = "", name = "" } = req.query;

    try {
        const comments = await prisma.commentDB.findMany({
            where: {
                OR: [
                    { userID: { contains: userID as string } },
                    { name: { contains: name as string } }
                ]
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalComments = await prisma.commentDB.count({
            where: {
                OR: [
                    { userID: { contains: userID as string } },
                    { name: { contains: name as string } }
                ]
            }
        });

        res.status(200).json({
            success: true,
            comments,
            pagination: {
                totalPages: Math.ceil(totalComments / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalComments,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching comments." });
    }
}
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { name, userID, content, createdBy } = req.body;

    try {
        const newComment = await prisma.commentDB.create({
            data: {
                name,
                userID,
                content,
                createdBy,
                updatedBy: "default_user", // Provide appropriate value here
                deleteBy: "default_user", // Provide appropriate value here
            },
        });

        res.status(201).json({ success: true, data: newComment });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating commentDB." });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, name, userID, content, createdBy } = req.body;

    try {
        const updatedComment = await prisma.commentDB.update({
            where: { id },
            data: {
                name,
                userID,
                content,
                createdBy,
            },
        });

        res.status(200).json({ success: true, data: updatedComment });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating commentDB." });
    }
}
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.commentDB.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting commentDB." });
    }
}
