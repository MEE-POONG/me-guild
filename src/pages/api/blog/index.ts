import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const page: number = Number(req.query.page) || 1;
                const pageSize: number = Number(req.query.pageSize) || 100;

                const blogs = await prisma.blogDB.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    orderBy: {
                        createdAt: 'desc', // Order by the most recent
                    },
                });

                const totalBlogs = await prisma.blogDB.count();
                const totalPage: number = Math.ceil(totalBlogs / pageSize);
                res.status(200).json({ blogs, totalPage });
            } catch (error) {
                console.error("Error fetching news updates:", error);
                res.status(500).json({ error: "An error occurred while fetching the blog updates" });
            }
            break;

        case 'POST':
            try {
                const { title, img, video, description, creditlink = '', updatedBy = '', deleteBy = '' } = req.body;

                if (!title || !img || !video || !description) {
                    return res.status(400).json({ error: "Title and content are required" });
                }

                const newBlogs = await prisma.blogDB.create({
                    data: { title, img, video, description, creditlink, updatedBy, deleteBy },
                });

                res.status(201).json(newBlogs);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the blog update" });
            }
            break

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}