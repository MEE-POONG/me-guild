import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const userData = req.body;

                // Check if userData is an array or a single object
                const usersArray = Array.isArray(userData) ? userData : [userData];

                // Validate required fields for each user
                const validUsers = usersArray.every(user =>
                    user.discord_id && user.username && user.email && user.password
                );

                if (!validUsers) {
                    return res.status(400).json({ error: "Invalid data format. Missing required fields." });
                }

                // Create users in the database
                const createdUsers = await prisma.userDB.createMany({
                    data: usersArray.map(user => ({
                        discord_id: user.discord_id,
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        createdBy: user.createdBy || 'system',
                        updatedBy: user.updatedBy || 'system',
                        deleteBy: user.deleteBy || '',
                    })),
                });

                res.status(201).json({ success: true, message: "Users created successfully", createdUsers });
            } catch (error) {
                console.error("Error creating users:", error);
                res.status(500).json({ error: "An error occurred while creating the users." });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
