import bcrypt from "bcryptjs";
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
    const { id, page = 1, pageSize = 10, keyword = "" } = req.query;

    try {
        if (id) {
            // ✅ ดึงข้อมูล Admin ตาม ID (รวมสิทธิ์ + ตำแหน่ง)
            const admin = await prisma.adminDB.findUnique({
                where: { id: id as string },
                include: {
                    UserDB: true,
                    serverDB: true,
                    AdminPositionDB: {
                        include: {
                            adminDepartmentDB: {
                                select: {
                                    name: true,
                                },
                            },
                            AdminDefaultPermissionDB: {
                                include: {
                                    MenuPageWeb: true,
                                },
                            },
                        },
                    },
                },
            });

            if (!admin) {
                return res.status(404).json({ success: false, error: "Admin not found." });
            }

            return res.status(200).json({ success: true, admin });
        }

        // ✅ ดึงข้อมูล Admin ทั้งหมด (พร้อม Pagination & ค้นหา)
        const exportDB = await prisma.adminDB.findMany({
            where: {
                OR: [
                    { username: { contains: keyword as string, mode: "insensitive" } },
                    { name: { contains: keyword as string, mode: "insensitive" } },
                ],
            },
            select: {
                id: true,
                name: true,
                username: true,
                tel: true,
                email: true,
                discordServerID: true,
                AdminPositionDB: {
                    select: {
                        name: true,
                        adminDepartmentDB: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            orderBy: { createdAt: "desc" },
        });

        const totalAdmins = await prisma.adminDB.count({
            where: {
                OR: [
                    { username: { contains: keyword as string, mode: "insensitive" } },
                    { name: { contains: keyword as string, mode: "insensitive" } },
                ],
            },
        });

        res.status(200).json({
            success: true,
            exportDB,
            pagination: {
                totalPages: Math.ceil(totalAdmins / Number(pageSize)),
                currentPage: Number(page),
                totalItems: totalAdmins,
            },
        });
    } catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ success: false, error: "Error fetching admins." });
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const {
        username,
        password,
        name,
        tel,
        email,
        userId,
        discordServerID,
        adminPositionId,
        createdBy
    } = req.body;

    if (!password) {
        return res.status(400).json({ success: false, error: "Password is required." });
    }

    try {
        const existingUser = await prisma.adminDB.findUnique({
            where: { username },
        });

        if (existingUser) {
            return res.status(400).json({ success: false, error: "Username already exists." });
        }

        const duplicateCombo = await prisma.adminDB.findFirst({
            where: {
                userId: userId || undefined,
                discordServerID: discordServerID || undefined,
            },
        });

        if (duplicateCombo) {
            return res.status(400).json({
                success: false,
                error: "มีแอดมินที่เชื่อมกับ User และ Discord Server นี้อยู่แล้ว",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await prisma.adminDB.create({
            data: {
                username,
                password: hashedPassword,
                name,
                tel,
                email,
                userId,
                discordServerID,
                adminPositionId,
                createdBy,
                createdAt: new Date(),
                updatedBy: createdBy || '',
                updatedAt: new Date(),
                deleteBy: '',
            },
            include: {
                UserDB: true,
                serverDB: true,
                AdminPositionDB: {
                    include: {
                        AdminDefaultPermissionDB: {
                            include: { MenuPageWeb: true },
                        },
                    },
                },
            },
        });

        res.status(201).json({ success: true, data: newAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error creating admin." });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, username, password, name, tel, email, userId, adminPositionId, updatedBy } = req.body;
    try {
        let updateData: any = {
            username,
            name,
            tel,
            email,
            userId,
            adminPositionId,
            updatedBy,
            updatedAt: new Date(),
        };

        if (typeof password === "string" && password.trim()) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedAdmin = await prisma.adminDB.update({
            where: { id },
            data: updateData,
            include: {
                UserDB: true,
                serverDB: true,
                AdminPositionDB: {
                    include: {
                        AdminDefaultPermissionDB: {
                            include: { MenuPageWeb: true },
                        },
                    },
                },
            },
        });

        res.status(200).json({ success: true, data: updatedAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error updating admin." });
    }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.adminDB.delete({
            where: { id },
        });

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error deleting admin." });
    }
}
