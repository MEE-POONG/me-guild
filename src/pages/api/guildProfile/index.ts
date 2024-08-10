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

                const guilds = await prisma.guildProfileDB.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    orderBy: {
                        createdAt: 'desc', // Order by the most recent
                    },
                });

                const totalGuilds = await prisma.guildProfileDB.count();
                const totalPage: number = Math.ceil(totalGuilds / pageSize);
                res.status(200).json({ guilds, totalPage });
            } catch (error) {
                console.error("Error fetching news updates:", error);
                res.status(500).json({ error: "An error occurred while fetching the news updates" });
            }
            break;

        case 'POST':
            try {
                const { guildname, rule, description, discordlink, backdrop, avatar } = req.body;

                if (!guildname || !rule || !description || !discordlink || !backdrop || !avatar) {
                    return res.status(400).json({ error: "content are required" });
                }

                // const newGuild = await prisma.guildProfile.create({
                //     data: { guildname, rule, description, discordlink, backdrop, avatar },
                // });

                // res.status(201).json(newGuild);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the news update" });
            }
            break

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}