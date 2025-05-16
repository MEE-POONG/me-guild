import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: "Username and password are required." });
  }

  try {
    const admin = await prisma.adminDB.findUnique({
      where: { username },
      include: {
        AdminPositionDB: {
          include: {
            adminDepartmentDB: true,
            AdminDefaultPermissionDB: {
              include: { MenuPageWeb: true },
            },
          },
        },
        UserDB: true,
        serverDB: true,
      },
    });

    if (!admin) {
      return res.status(401).json({ success: false, error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid username or password" });
    }

    // ✅ สิทธิ์จากตำแหน่ง (AdminDefaultPermissionDB)
    const permissions = admin.AdminPositionDB?.AdminDefaultPermissionDB.map((perm) => ({
      menu: perm.MenuPageWeb?.id || null,
      menuName: perm.MenuPageWeb?.name || "Unknown",
      canAdvance: perm.canAdvance,
      canViews: perm.canViews,
      canCreate: perm.canCreate,
      canUpdate: perm.canUpdate,
      canDelete: perm.canDelete,
    })) || [];

    // ✅ ข้อมูลผู้ใช้ (UserDB)
    const user = admin.UserDB
      ? {
        id: admin.UserDB.id,
        img: admin.UserDB.img,
        email: admin.UserDB.email,
        nickname: admin.UserDB.nickname,
      }
      : null;

    // ✅ ข้อมูลเซิร์ฟเวอร์ (ServerDB)
    const server = admin.serverDB
      ? {
        id: admin.serverDB.id,
        serverName: admin.serverDB.serverName,
        serverId: admin.serverDB.serverId,
      }
      : null;

    // ✅ บันทึกการเข้าสู่ระบบ
    await prisma.adminDB.update({
      where: { id: admin.id },
      data: { updatedAt: new Date(), updatedBy: admin.username },
    });

    // ✅ ตอบกลับ client
    const adminData = {
      id: admin.id,
      username: admin.username,
      name: admin.name,
      email: admin.email,
      tel: admin.tel,
      position: admin.AdminPositionDB?.name || "Unknown",
      discordServerID: admin.discordServerID,
      server,
      user,
      permissions,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };

    return res.status(200).json({ success: true, message: "Login successful", admin: adminData });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, error: "Error logging in." });
  } finally {
    await prisma.$disconnect();
  }
}
