import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const users = await prisma.userDB.findMany({
                    orderBy: {
                        createdAt: 'desc', // Order by the most recent
                    },
                });

                res.status(200).json(users); 
            } catch (error) {
                console.error("Error fetching users:", error);
                res.status(500).json({ error: "An error occurred while fetching users" });
            }
            break;

        case 'POST':
            try {
                const { username, email, password, discord_id } = req.body;

                if (!username || !email || !password || !discord_id) {
                    return res.status(400).json({ error: "Name, email, and avatar are required" });
                }

                const newUser = await prisma.userDB.create({
                    data: { username, email, password, discord_id },
                });

                res.status(201).json(newUser);
            } catch (error) {
                console.error("Error creating user:", error);
                res.status(500).json({ error: "An error occurred while creating the user" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
