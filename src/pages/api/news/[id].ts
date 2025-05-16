// pages/api/news/[id].ts

import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Invalid or missing news ID" });
    }

    switch (method) {
        case 'GET':
            try {
                const newsData = await prisma.newsUpdateDB.findUnique({
                    where: { id },
                });

                if (!newsData) {
                    return res.status(404).json({ error: "News update not found" });
                }

                res.status(200).json({ success: true, data: newsData });
            } catch (error) {
                console.error("Error fetching news update:", error);
                res.status(500).json({ error: "An error occurred while fetching the news update" });
            }
            break;

        case 'PUT':
            try {
                const { title, img, description, creditlink } = req.body;

                if (!title || !img || !description || !creditlink) {
                    return res.status(400).json({ error: "Title, image, description, and credit link are required" });
                }

                const updatedNews = await prisma.newsUpdateDB.update({
                    where: { id },
                    data: { title, img, description, creditlink },
                });

                res.status(200).json({ success: true, data: updatedNews });
            } catch (error) {
                console.error("Error updating news update:", error);
                res.status(500).json({ error: "An error occurred while updating the news update" });
            }
            break;

        case 'DELETE':
            try {
                const { deleteBy } = req.body;

                // Soft delete by setting the deleteBy field
                const deletedNews = await prisma.newsUpdateDB.update({
                    where: { id },
                    data: { deleteBy },
                });

                res.status(200).json({ success: true, data: deletedNews });
            } catch (error) {
                console.error("Error deleting news update:", error);
                res.status(500).json({ error: "An error occurred while deleting the news update" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
