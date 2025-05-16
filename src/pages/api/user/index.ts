import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            await handleGet(req, res);
            break;
        case 'POST':
            await handlePost(req, res);
            break;
        case 'PUT':
            await handlePut(req, res);
            break;
        case 'DELETE':
            await handleDelete(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { page = 1, pageSize = 10, discord_id = "", email = "", username = "" } = req.query;

    try {
        const users = await prisma.userDB.findMany({
            where: {
                discord_id: discord_id ? discord_id as string : undefined,
                email: email ? email as string : undefined,
                username: username ? username as string : undefined,
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalUsers = await prisma.userDB.count({
            where: {
                discord_id: discord_id ? discord_id as string : undefined,
                email: email ? email as string : undefined,
                username: username ? username as string : undefined,
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
        res.status(500).json({ success: false, error: "Error fetching users." });
    }
}
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { discord_id, username, email, nickname, password, firstname, lastname, birthday, gender, alternativeGender, createdBy } = req.body;

    try {
        const newUser = await prisma.userDB.create({
            data: {
                discord_id,
                username,
                email,
                nickname,
                password,
                firstname,
                lastname,
                birthday: birthday ? new Date(birthday) : null, // ✅ แปลงเป็น Date หรือให้เป็น null
                gender,
                alternativeGender,
                createdBy,
                createdAt: new Date(), // ✅ เพิ่มค่า createdAt
                updatedAt: new Date(), // ✅ เพิ่มค่า updatedAt
                updatedBy: createdBy || '',
                deleteBy: '',
            },
        });
        

        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating user record." });
    }
}
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, username, email, nickname, password, firstname, lastname, birthday, gender, alternativeGender, updatedBy } = req.body;

    try {
        const updatedUser = await prisma.userDB.update({
            where: { id },
            data: {
                username,
                email,
                nickname,
                password,
                firstname,
                lastname,
                birthday,
                gender,
                alternativeGender,
                updatedBy,
            },
        });

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating user record." });
    }
}
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.userDB.delete({
            where: { id },
        });

        res.status(204).end(); // No content after successful deletion
    } catch (error) {
        res.status(500).json({ success: false, error: "Error deleting user record." });
    }
}
