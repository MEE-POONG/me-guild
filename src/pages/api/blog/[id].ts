// pages/api/blog/[id].ts

import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Invalid or missing blog ID" });
    }

    switch (method) {
        case 'GET':
            try {
                const blog = await prisma.blogDB.findUnique({
                    where: { id },
                });

                if (!blog) {
                    return res.status(404).json({ error: "Blog not found" });
                }

                res.status(200).json({ success: true, data: blog });
            } catch (error) {
                console.error("Error fetching blog:", error);
                res.status(500).json({ error: "An error occurred while fetching the blog" });
            }
            break;

        case 'PUT':
            try {
                const { title, img, video, description, creditlink } = req.body;

                if (!title || !img || !description || !creditlink) {
                    return res.status(400).json({ error: "Title, image, description, and credit link are required" });
                }

                const updatedBlog = await prisma.blogDB.update({
                    where: { id },
                    data: { title, img, video, description, creditlink },
                });

                res.status(200).json({ success: true, data: updatedBlog });
            } catch (error) {
                console.error("Error updating blog:", error);
                res.status(500).json({ error: "An error occurred while updating the blog" });
            }
            break;

        case 'DELETE':
            try {
                await prisma.blogDB.delete({
                    where: { id },
                });

                res.status(204).end(); // No content response for successful deletion
            } catch (error) {
                console.error("Error deleting blog:", error);
                res.status(500).json({ error: "An error occurred while deleting the blog" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
