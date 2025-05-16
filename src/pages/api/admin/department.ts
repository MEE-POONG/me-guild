import { Prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "GET":
            await handleGet(req, res);
            break;
        case "POST":
            await handlePost(req, res);
            break;
        case "PUT":
            await handlePut(req, res);
            break;
        case "DELETE":
            await handleDelete(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

// ✅ ดึงข้อมูลแผนกทั้งหมด
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { page = '1', pageSize = '10', keyword = "" } = req.query;

        // ✅ ใช้ `page` และ `pageSize` สำหรับ Pagination
        const pageNum = parseInt(page as string, 10) || 1;
        const pageSizeNum = parseInt(pageSize as string, 10) || 10;
        const skip = (pageNum - 1) * pageSizeNum;

        // ✅ เงื่อนไขการค้นหา `keyword`
        const whereClause: Prisma.AdminDepartmentDBWhereInput = {
            deleteBy: '',
            name: keyword ? { contains: keyword as string, mode: 'insensitive' } : undefined,
        };

        // ✅ ดึงข้อมูลแผนกพร้อมตำแหน่งภายในแผนก
        const [departments, totalDepartments] = await Promise.all([
            prisma.adminDepartmentDB.findMany({
                where: whereClause,
                include: {
                    adminPositionDB: {
                        orderBy: { priority: 'asc' }, // ✅ เรียงลำดับตำแหน่งตาม Priority
                    },
                },
                skip,
                take: pageSizeNum,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.adminDepartmentDB.count({ where: whereClause }),
        ]);

        // ✅ ส่งข้อมูลกลับพร้อม Pagination
        res.status(200).json({
            success: true,
            data: departments,
            pagination: {
                totalItems: totalDepartments,
                totalPages: Math.ceil(totalDepartments / pageSizeNum),
                currentPage: pageNum,
                pageSize: pageSizeNum,
            },
        });
    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ success: false, error: "Error fetching departments." });
    }
}


// ✅ เพิ่มแผนกใหม่
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { name, createdBy } = req.body;

    try {
        const newDepartment = await prisma.adminDepartmentDB.create({
            data: {
                name,
                createdBy,
                createdAt: new Date(),
                updatedBy: createdBy || "",
                updatedAt: new Date(),
                deleteBy: "",
            },
        });

        res.status(201).json({ success: true, data: newDepartment });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error creating department." });
    }
}

// ✅ อัปเดตชื่อแผนก
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, name, updatedBy } = req.body;

    try {
        const updatedDepartment = await prisma.adminDepartmentDB.update({
            where: { id },
            data: { name, updatedBy, updatedAt: new Date() },
        });

        res.status(200).json({ success: true, data: updatedDepartment });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating department." });
    }
}

// ✅ ลบแผนก
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }

    const { id } = req.body; // 🆔 รับค่า ID ของแผนกที่จะลบ

    try {
        // 🔍 ตรวจสอบว่ามีแผนกนี้จริงหรือไม่
        const department = await prisma.adminDepartmentDB.findUnique({
            where: { id },
            include: { adminPositionDB: true }, // ดึงตำแหน่งทั้งหมดที่เกี่ยวข้อง
        });

        if (!department) {
            return res.status(404).json({ success: false, error: "Department not found." });
        }

        // ✅ ใช้ transaction ลบตำแหน่งที่เกี่ยวข้องก่อน แล้วค่อยลบแผนก
        await prisma.$transaction([
            prisma.adminPositionDB.deleteMany({ where: { adminDepartmentId: id } }), // ลบตำแหน่งทั้งหมด
            prisma.adminDepartmentDB.delete({ where: { id } }), // ลบแผนก
        ]);

        res.status(200).json({ success: true, message: "Department and related positions deleted successfully." });
    } catch (error) {
        console.error("Error deleting department:", error);
        res.status(500).json({ success: false, error: "Error deleting department and positions." });
    }
}
