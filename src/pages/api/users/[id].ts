// pages/api/users/[id].ts

import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const user = await prisma.userDB.findUnique({
                    where: { id: id as string },
                });

                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }

                res.status(200).json(user);
            } catch (error) {
                console.error("Error fetching user:", error);
                res.status(500).json({ error: "An error occurred while fetching the user" });
            }
            break;

        case 'PUT':
            try {
                const { username, email, password, discord_id } = req.body;

                if (!username || !email || !password || !discord_id) {
                    return res.status(400).json({ error: "Name, email, and avatar are required" });
                }

                const updatedUser = await prisma.userDB.update({
                    where: { id: id as string },
                    data: { username, email, password, discord_id },
                });

                res.status(200).json(updatedUser);
            } catch (error) {
                console.error("Error updating user:", error);
                res.status(500).json({ error: "An error occurred while updating the user" });
            }
            break;

        case 'DELETE':
            try {
                await prisma.userDB.delete({
                    where: { id: id as string },
                });

                res.status(204).end();
            } catch (error) {
                console.error("Error deleting user:", error);
                res.status(500).json({ error: "An error occurred while deleting the user" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
