import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            await handleGetSearch(req, res);
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
async function handleGetSearch(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }

    const { keyword = "", page = 1, pageSize = 10 } = req.query;

    try {
        const users = await prisma.userDB.findMany({
            where: {
                OR: [
                    { discord_id: { contains: keyword as string, mode: "insensitive" } },
                    { email: { contains: keyword as string, mode: "insensitive" } },
                    { username: { contains: keyword as string, mode: "insensitive" } },
                    { nickname: { contains: keyword as string, mode: "insensitive" } },
                ],
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: "desc",
            },
        });

        const totalUsers = await prisma.userDB.count({
            where: {
                OR: [
                    { discord_id: { contains: keyword as string, mode: "insensitive" } },
                    { email: { contains: keyword as string, mode: "insensitive" } },
                    { username: { contains: keyword as string, mode: "insensitive" } },
                    { nickname: { contains: keyword as string, mode: "insensitive" } },
                ],
            },
        });

        res.status(200).json({
            success: true,
            users,
            pagination: {
                totalPages: Math.ceil(totalUsers / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalUsers,
            },
        });
    } catch (error) {
        console.error("Error searching users:", error);
        res.status(500).json({ success: false, error: "Error fetching users." });
    }
}
