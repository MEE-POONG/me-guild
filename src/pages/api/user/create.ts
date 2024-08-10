// /pages/api/activities/create.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const userData = req.body;

                if (!Array.isArray(userData)) {
                    res.status(400).json({ error: "Invalid data format. Expected an array of users." });
                    return;
                }

                const createdUser = await prisma.userDB.createMany({
                    data: userData.map((user: any) => ({
                        discord_id: user.discord_id,
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        createdBy: 'system', // Assuming 'system' is the createdBy value
                        updatedBy: '',
                        deleteBy: '',
                    })),
                });

                res.status(201).json(createdUser);
            } catch (error) {
                console.error("Error creating activities:", error);
                res.status(500).json({ error: "An error occurred while creating the activities." });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}