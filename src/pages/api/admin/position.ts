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

// ✅ ดึงข้อมูลตำแหน่งทั้งหมด
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { page = '1', pageSize = '10', keyword = "", id, departmentId } = req.query;

        // ✅ เช็คว่ามีการส่ง `id` มาไหม ถ้ามีให้ดึงเฉพาะตำแหน่งนั้น
        if (id) {
            const position = await prisma.adminPositionDB.findUnique({
                where: { id: id as string },
                include: { adminDepartmentDB: true },
            });

            if (!position) {
                return res.status(404).json({ success: false, error: "Position not found." });
            }

            return res.status(200).json({ success: true, data: position });
        }

        // ✅ ใช้ `page` และ `pageSize` สำหรับ Pagination
        const pageNum = parseInt(page as string, 10) || 1;
        const pageSizeNum = parseInt(pageSize as string, 10) || 10;
        const skip = (pageNum - 1) * pageSizeNum;

        // ✅ เงื่อนไขการค้นหา `keyword` และ `departmentId`
        const whereClause: Prisma.AdminPositionDBWhereInput = {
            deleteBy: '',
            adminDepartmentId: departmentId ? departmentId as string : undefined, // ✅ ถ้ามี `departmentId` ให้ใช้
            OR: keyword
                ? [
                    { name: { contains: keyword as string, mode: 'insensitive' } },
                    { adminDepartmentDB: { name: { contains: keyword as string, mode: 'insensitive' } } },
                ]
                : undefined,
        };

        // ✅ ดึงข้อมูลตำแหน่งทั้งหมดตามเงื่อนไข
        const [exportDB, totalPositions] = await Promise.all([
            prisma.adminPositionDB.findMany({
                where: whereClause,
                include: { adminDepartmentDB: true },
                skip,
                take: pageSizeNum,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.adminPositionDB.count({ where: whereClause }),
        ]);

        // ✅ ส่งข้อมูลกลับพร้อม Pagination
        res.status(200).json({
            success: true,
            exportDB,
            pagination: {
                totalItems: totalPositions,
                totalPages: Math.ceil(totalPositions / pageSizeNum),
                currentPage: pageNum,
                pageSize: pageSizeNum,
            },
        });
    } catch (error) {
        console.error("Error fetching positions:", error);
        res.status(500).json({ success: false, error: "Error fetching positions." });
    }
}



// ✅ เพิ่มตำแหน่งใหม่
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { name, priorityPositionId, adminDepartmentId, createdBy } = req.body;

    try {
        let newPriority = 1; // ค่าเริ่มต้นถ้ายังไม่มีตำแหน่งในแผนก

        if (priorityPositionId) {
            // 🔹 หา priority ของตำแหน่งที่อ้างอิง
            const referencePosition = await prisma.adminPositionDB.findUnique({
                where: { id: priorityPositionId },
                select: { priority: true },
            });

            if (referencePosition) {
                newPriority = referencePosition.priority; // ใช้ priority เดิมของตำแหน่งที่เลือก

                // 🔹 อัปเดต priority ของตำแหน่งอื่น ๆ ในแผนก (เลื่อนลง 1)
                await prisma.adminPositionDB.updateMany({
                    where: {
                        adminDepartmentId,
                        priority: { gte: newPriority }, // ตำแหน่งที่มี priority เท่ากับหรือมากกว่า newPriority
                    },
                    data: { priority: { increment: 1 } }, // เพิ่มค่าทีละ 1
                });
            }
        } else {
            // 🔹 ถ้าไม่ได้เลือกตำแหน่งอ้างอิง ให้หาค่ามากที่สุด
            const lastPosition = await prisma.adminPositionDB.findFirst({
                where: { adminDepartmentId },
                orderBy: { priority: "desc" }, // หาตำแหน่งที่มี priority สูงสุด
                select: { priority: true },
            });

            newPriority = lastPosition ? lastPosition.priority + 1 : 1; // ถ้ามีตำแหน่งแล้วเพิ่มจากค่าล่าสุด ถ้าไม่มีให้เริ่มที่ 1
        }

        // 🔹 เพิ่มตำแหน่งใหม่
        const newPosition = await prisma.adminPositionDB.create({
            data: {
                name,
                adminDepartmentId,
                priority: newPriority,
                createdBy,
                createdAt: new Date(),
                updatedBy: createdBy || "",
                updatedAt: new Date(),
                deleteBy: "",
            },
        });

        res.status(201).json({ success: true, data: newPosition });
    } catch (error) {
        console.error("Error creating position:", error);
        res.status(500).json({ success: false, error: "Error creating position." });
    }
}

// ✅ อัปเดตตำแหน่ง
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, name, adminDepartmentId, updatedBy } = req.body;

    try {
        const updatedPosition = await prisma.adminPositionDB.update({
            where: { id },
            data: { name, adminDepartmentId, updatedBy, updatedAt: new Date() },
        });

        res.status(200).json({ success: true, data: updatedPosition });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error updating position." });
    }
}

// ✅ ลบตำแหน่ง
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }

    try {
        let { ids } = req.body;


        // ✅ ถ้า `ids` เป็น string เดี่ยว -> แปลงเป็น Array
        if (typeof ids === "string") {
            ids = [ids];
        }

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, error: "No positions selected for deletion." });
        }

        // 🔍 ดึงข้อมูลตำแหน่งที่ต้องการลบ
        const positionsToDelete = await prisma.adminPositionDB.findMany({
            where: { id: { in: ids } },
            orderBy: { priority: "asc" },
        });

        if (positionsToDelete.length === 0) {
            return res.status(404).json({ success: false, error: "Positions not found." });
        }

        // 🔍 ดึงตำแหน่งทั้งหมดของแผนก
        const allPositions = await prisma.adminPositionDB.findMany({
            where: { adminDepartmentId: positionsToDelete[0].adminDepartmentId },
            orderBy: { priority: "asc" },
        });

        // ✅ **ลบข้อมูลจริงจากฐานข้อมูล (Hard Delete)**
        await prisma.adminPositionDB.deleteMany({
            where: { id: { in: ids } },
        });

        // 🔄 **อัปเดต Priority ของตำแหน่งที่เหลือ**
        const remainingPositions = allPositions.filter(pos => !ids.includes(pos.id));

        for (let i = 0; i < remainingPositions.length; i++) {
            await prisma.adminPositionDB.update({
                where: { id: remainingPositions[i].id },
                data: { priority: i + 1 }, // ให้ priority ใหม่เริ่มจาก 1
            });
        }

        res.status(200).json({
            success: true,
            message: "Positions deleted and priorities updated successfully.",
        });
    } catch (error) {
        console.error("Error deleting positions:", error);
        res.status(500).json({ success: false, error: "Error deleting positions." });
    }
}
