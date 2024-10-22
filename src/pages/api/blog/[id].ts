// pages/api/news/[id].ts

import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const blogs = await prisma.blogDB.findUnique({
                    where: { id: id as string },
                });

                if (!blogs) {
                    return res.status(404).json({ error: "Blog update not found" });
                }

                res.status(200).json(blogs);
            } catch (error) {
                console.error("Error fetching blogs update:", error);
                res.status(500).json({ error: "An error occurred while fetching the blogs update" });
            }
            break;

        case 'PUT':
            try {
                const { title, img, video, description, creditlink } = req.body;

                if (!title || !img || !video || !description || !creditlink) {
                    return res.status(400).json({ error: "Title and content are required" });
                }

                const updatedBlogs = await prisma.blogDB.update({
                    where: { id: id as string },
                    data: { title, img, video, description, creditlink },
                });

                res.status(200).json(updatedBlogs);
            } catch (error) {
                console.error("Error updating blog update:", error);
                res.status(500).json({ error: "An error occurred while updating the blog update" });
            }
            break;

        case 'DELETE':
            try {
                await prisma.blogDB.delete({
                    where: { id: id as string },
                });

                res.status(204).end();
            } catch (error) {
                console.error("Error deleting blog update:", error);
                res.status(500).json({ error: "An error occurred while deleting the blog update" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
