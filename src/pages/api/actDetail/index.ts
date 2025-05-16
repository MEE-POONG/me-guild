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

                const activities = await prisma.actDetailDB.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    orderBy: {
                        createdAt: 'desc', // Order by the most recent
                    },
                });

                const totalActivities = await prisma.actDetailDB.count();
                const totalPage: number = Math.ceil(totalActivities / pageSize);
                res.status(200).json({ activities, totalPage });
            } catch (error) {
                console.error("Error fetching news updates:", error);
                res.status(500).json({ error: "An error occurred while fetching the activity updates" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}