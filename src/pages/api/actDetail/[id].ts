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
                const actDetail = await prisma.actDetail.findUnique({
                    where: { id: id as string },
                });

                if (!actDetail) {
                    return res.status(404).json({ error: "News update not found" });
                }

                res.status(200).json(actDetail);
            } catch (error) {
                console.error("Error fetching news update:", error);
                res.status(500).json({ error: "An error occurred while fetching the news update" });
            }
            break;

        case 'PUT':
            try {
                const { title, img, description, point, type, startdate, enddate, disname, dislink } = req.body;

                if (!title || !img || !description || !point || !type || !startdate || !enddate || !disname || !dislink) {
                    return res.status(400).json({ error: "Title and content are required" });
                }

                const updatedActivities = await prisma.actDetail.update({
                    where: { id: id as string },
                    data: { title, img, description, point, type, startdate, enddate, disname, dislink },
                });

                res.status(200).json(updatedActivities);
            } catch (error) {
                console.error("Error updating news update:", error);
                res.status(500).json({ error: "An error occurred while updating the news update" });
            }
            break;

        case 'DELETE':
            try {
                await prisma.actDetail.delete({
                    where: { id: id as string },
                });

                res.status(204).end();
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
