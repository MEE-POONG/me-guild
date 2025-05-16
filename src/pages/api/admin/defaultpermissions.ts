import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                return await getPermissions(req, res);
            case "POST":
                return await createPermission(req, res);
            case "PUT":
                return await updatePermission(req, res);
            case "DELETE":
                return await deletePermission(req, res);
            default:
                return res.status(405).json({ success: false, error: "Method Not Allowed" });
        }
    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

/** ✅ ดึงข้อมูลสิทธิ์ทั้งหมด (GET) */
async function getPermissions(req: NextApiRequest, res: NextApiResponse) {
    try {
        const permissions = await prisma.adminDefaultPermissionDB.findMany({
            include: {
                AdminPositionDB: true,
                MenuPageWeb: true,
            },
        });
        return res.status(200).json({ success: true, data: permissions });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error fetching permissions" });
    }
}

/** ✅ สร้างสิทธิ์ใหม่ (POST) */
async function createPermission(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {
            adminPositionDBId,
            menuPageWebId,
            canAdvance,
            canViews,
            canCreate,
            canUpdate,
            canDelete,
            createdBy,
        } = req.body;

        if (!adminPositionDBId || !menuPageWebId || !createdBy) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const newPermission = await prisma.adminDefaultPermissionDB.create({
            data: {
                adminPositionDBId,
                menuPageWebId,
                canAdvance: Boolean(canAdvance),
                canViews: Boolean(canViews),
                canCreate: Boolean(canCreate),
                canUpdate: Boolean(canUpdate),
                canDelete: Boolean(canDelete),
                createdBy,
                createdAt: new Date(),
                updatedBy: createdBy,
                updatedAt: new Date(),
                deleteBy: "",
            },
        });

        return res.status(201).json({ success: true, data: newPermission });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Error creating permission" });
    }
}

/** ✅ อัปเดตสิทธิ์ (PUT) */
async function updatePermission(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {
            id,
            canAdvance,
            canViews,
            canCreate,
            canUpdate,
            canDelete,
            updatedBy,
        } = req.body;

        if (!id || !updatedBy) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const updatedPermission = await prisma.adminDefaultPermissionDB.update({
            where: { id },
            data: {
                canAdvance: Boolean(canAdvance),
                canViews: Boolean(canViews),
                canCreate: Boolean(canCreate),
                canUpdate: Boolean(canUpdate),
                canDelete: Boolean(canDelete),
                updatedBy,
            },
        });

        return res.status(200).json({ success: true, data: updatedPermission });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error updating permission" });
    }
}

/** ✅ ลบสิทธิ์ (DELETE) */
async function deletePermission(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, error: "Missing permission ID" });
        }

        const permissionToDelete = await prisma.adminDefaultPermissionDB.findUnique({
            where: { id },
        });

        if (!permissionToDelete) {
            return res.status(404).json({ success: false, error: "Permission not found" });
        }

        await prisma.adminDefaultPermissionDB.delete({
            where: { id },
        });

        return res.status(200).json({ success: true, message: "Permission deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error deleting permission" });
    }
}
