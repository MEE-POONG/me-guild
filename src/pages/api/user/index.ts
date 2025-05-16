import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcryptjs"; // เพิ่ม bcryptjs สำหรับเข้ารหัส

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        // GET: ดึงรายการ Users ทั้งหมด
        case 'GET':
            try {
                const page: number = Number(req.query.page) || 1;
                const pageSize: number = Number(req.query.pageSize) || 10;

                const users = await prisma.userDB.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    orderBy: {
                        createdAt: 'desc', // เรียงลำดับข้อมูลตามวันที่สร้างล่าสุด
                    },
                });

                const totalUsers = await prisma.userDB.count();
                const totalPage: number = Math.ceil(totalUsers / pageSize);

                res.status(200).json({ users, totalPage });
            } catch (error) {
                console.error("Error fetching users:", error);
                res.status(500).json({ error: "An error occurred while fetching the users" });
            }
            break;

        // POST: เพิ่มข้อมูล User ใหม่
        case 'POST':
            try {
                const {
                    discord_id,
                    username,
                    email,
                    password,
                    nickname,
                } = req.body;

                // ตรวจสอบข้อมูลที่จำเป็น
                if (!discord_id || !email || !password) {
                    return res.status(400).json({ error: "ข้อมูลไม่ครบถ้วน กรุณากรอกข้อมูลให้ครบทุกช่องที่จำเป็น" });
                }

                // ตรวจสอบข้อมูลซ้ำ
                const existingUser = await prisma.userDB.findFirst({
                    where: {
                        OR: [
                            { email: email }, // ตรวจสอบ email ซ้ำ
                            { discord_id: discord_id } // ตรวจสอบ discord_id ซ้ำ
                        ]
                    }
                });

                if (existingUser) {
                    return res.status(409).json({ error: "อีเมล หรือ Discord ID นี้ถูกใช้ไปแล้ว กรุณาใช้ข้อมูลอื่น" });
                }

                // เข้ารหัสรหัสผ่าน
                const hashedPassword = await bcrypt.hash(password, 10);

                // เพิ่มข้อมูลลงฐานข้อมูล
                const newUser = await prisma.userDB.create({
                    data: {
                        discord_id,
                        username: username || null,
                        email,
                        password: hashedPassword,
                        nickname: nickname || null,
                        updatedBy: "admin",
                        deleteBy: ""
                    },
                });

                res.status(201).json(newUser);

            } catch (error) {
                console.error("Error creating user : ", error);
                res.status(500).json({ error: "เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
