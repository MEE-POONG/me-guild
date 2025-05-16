import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    try {
        switch (req.method) {
            case 'GET':
                const role = await prisma.roleDiscord.findUnique({ where: { id } });
                if (!role) return res.status(404).json({ message: 'Role not found' });
                return res.status(200).json(role);

            case 'PUT':
                const updateData = req.body;

                const updatedRole = await prisma.roleDiscord.update({
                    where: { id },
                    data: updateData,
                });

                return res.status(200).json(updatedRole);

            case 'DELETE':
                await prisma.roleDiscord.delete({ where: { id } });
                return res.status(204).end();

            default:
                return res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
