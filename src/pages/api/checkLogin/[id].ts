import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req;

    const id = query.id as string;

    if (!id) {
        res.status(400).json({ error: "ID is required" });
        return;
    }

    switch (method) {
        case 'GET':
            try {
                const user = await prisma.userDB.findUnique({
                    where: { id },
                });

                if (!user) {
                    res.status(404).json({ error: "User not found" });
                    return;
                }

                res.status(200).json(user);
            } catch (error: any) {
                console.error("GET error:", error);
                res.status(500).json({ error: "An error occurred while fetching the user" });
            }
            break;

        case 'PUT':
            try {
                const updatedUser = await prisma.userDB.update({
                    where: { id },
                    data: req.body,
                });

                res.status(200).json(updatedUser);
            } catch (error: any) {
                console.error("PUT error:", error);
                if (error.code === 'P2025') {
                    res.status(404).json({ error: "User not found" });
                } else {
                    res.status(500).json({ error: "An error occurred while updating the user" });
                }
            }
            break;

        case 'DELETE':
            try {
                const deletedUser = await prisma.userDB.delete({
                    where: { id },
                });

                res.status(200).json(deletedUser);
            } catch (error: any) {
                console.error("DELETE error:", error);
                if (error.code === 'P2025') {
                    res.status(404).json({ error: "User not found" });
                } else {
                    res.status(500).json({ error: "An error occurred while deleting the user" });
                }
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
