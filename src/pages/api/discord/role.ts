import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ API Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "GET":
        return await getRoles(req, res);
      case "POST":
        return await createRole(req, res);
      case "PUT":
        return await updateRole(req, res);
      case "DELETE":
        return await deleteRole(req, res);
      default:
        return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("🚨 API Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

// ✅ GET: ดึงข้อมูล Role ทั้งหมด
async function getRoles(req: NextApiRequest, res: NextApiResponse) {
  try {
    const roles = await prisma.roleDiscord.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, data: roles });
  } catch (error) {
    console.error("🚨 Error fetching roles:", error);
    res.status(500).json({ success: false, error: "Error fetching roles" });
  }
}

// ✅ POST: เพิ่มข้อมูล Role ใหม่
async function createRole(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, roldID, discordServerID, createdBy } = req.body;

    if (!name.trim() || !roldID.trim() || !discordServerID.trim()) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // ✅ ตรวจสอบว่ามี RoleID ซ้ำหรือไม่
    const existingRole = await prisma.roleDiscord.findFirst({
      where: { roldID, discordServerID },
    });

    if (existingRole) {
      return res.status(400).json({ success: false, error: "Role นี้มีอยู่แล้วในเซิร์ฟเวอร์นี้" });
    }

    const newRole = await prisma.roleDiscord.create({
      data: {
        name,
        roldID,
        discordServerID,
        createdBy,
        createdAt: new Date(),
        updatedBy: createdBy || '',
        updatedAt: new Date(),
        deleteBy: '',
      },
    });

    return res.status(201).json({ success: true, data: newRole });
  } catch (error) {
    console.error("🚨 Error creating role:", error);
    res.status(500).json({ success: false, error: "Error creating role" });
  }
}

// ✅ PUT: อัปเดตข้อมูล Role
async function updateRole(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, name, roldID, discordServerID, updatedBy } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: "Role ID is required" });
    }

    const existingRole = await prisma.roleDiscord.findUnique({ where: { id } });
    if (!existingRole) {
      return res.status(404).json({ success: false, error: "Role not found" });
    }

    const updatedRole = await prisma.roleDiscord.update({
      where: { id },
      data: { name, roldID, discordServerID, updatedBy },
    });

    return res.status(200).json({ success: true, data: updatedRole });
  } catch (error) {
    console.error("🚨 Error updating role:", error);
    res.status(500).json({ success: false, error: "Error updating role" });
  }
}

// ✅ DELETE: ลบ Role
async function deleteRole(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: "Role ID is required" });
    }

    const existingRole = await prisma.roleDiscord.findUnique({ where: { id } });
    if (!existingRole) {
      return res.status(404).json({ success: false, error: "Role not found" });
    }

    await prisma.roleDiscord.delete({ where: { id } });

    return res.status(200).json({ success: true, message: "Role deleted successfully" });
  } catch (error) {
    console.error("🚨 Error deleting role:", error);
    res.status(500).json({ success: false, error: "Error deleting role" });
  }
}
