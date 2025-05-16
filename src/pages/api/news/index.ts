import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const page: number = Number(req.query.page) || 1;
                const pageSize: number = Number(req.query.pageSize) || 20;

                const news = await prisma.newsUpdateDB.findMany({
                    // where: { updatedAt: { not: null } }, // Ensure only non-null updatedAt values are fetched
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    orderBy: { createdAt: "desc" },
                    include: { newsTypeNews: true },
                });

                const totalNews = await prisma.newsUpdateDB.count();
                const totalPage: number = Math.ceil(totalNews / pageSize);

                res.status(200).json({ news, totalPage, currentPage: page });
            } catch (error) {
                console.error("Error fetching news updates:", error);
                res.status(500).json({ error: "An error occurred while fetching the news updates" });
            }
            break;


        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
