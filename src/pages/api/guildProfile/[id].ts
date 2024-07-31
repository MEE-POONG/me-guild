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
                const guildProfile = await prisma.guildProfile.findUnique({
                    where: { id: id as string },
                });

                if (!guildProfile) {
                    return res.status(404).json({ error: "Guild not found" });
                }

                res.status(200).json(guildProfile);
            } catch (error) {
                console.error("Error fetching guild:", error);
                res.status(500).json({ error: "An error occurred while fetching the guild" });
            }
            break;

        case 'PUT':
            try {
                const { guildname, rule, description, discordlink, backdrop, avatar } = req.body;

                if (!guildname || !rule || !description || !discordlink || !backdrop || !avatar) {
                    return res.status(400).json({ error: "Content are required" });
                }

                const updatedGuilds = await prisma.guildProfile.update({
                    where: { id: id as string },
                    data: { guildname, rule, description, discordlink, backdrop, avatar },
                });

                res.status(200).json(updatedGuilds);
            } catch (error) {
                console.error("Error updating guild profile:", error);
                res.status(500).json({ error: "An error occurred while updating the guild profile" });
            }
            break;

        case 'DELETE':
            try {
                await prisma.guildProfile.delete({
                    where: { id: id as string },
                });

                res.status(204).end();
            } catch (error) {
                console.error("Error deleting guild profile:", error);
                res.status(500).json({ error: "An error occurred while deleting the guild profile" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
