import { NextApiRequest, NextApiResponse } from "next";
import { MenuPageWebDB, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface ExtendedMenuPageWebDB extends MenuPageWebDB {
  submenu: MenuPageWebDB[];
}

// ✅ API handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "GET":
        return await getMenuPageAlls(req, res);
      case "PUT":
        return await putMenuPageWeb(req, res);
      default:
        return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

// ✅ 1. ดึงข้อมูลหน้าเว็บทั้งหมด (GET /api/pageweb)
async function getMenuPageAlls(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { keyword = "", id } = req.query;

    // ✅ ดึงข้อมูลเมนูทั้งหมด โดยกรอง `itOn: false`
    const allMenuItems = await prisma.menuPageWebDB.findMany({
      where: {
        itOn: true, // ✅ เอาเฉพาะเมนูที่ `itOn: true`
        OR: [
          { link: { contains: keyword as string, mode: "insensitive" } },
          { name: { contains: keyword as string, mode: "insensitive" } },
        ],
      },
      orderBy: [{ showOrder: "asc" }],
    });

    // ✅ หา `id` ของเมนูที่ `itOn: false`
    const excludedParentIds = new Set(
      allMenuItems
        .filter((item) => item.itOn === false) // ✅ หาเมนูที่ `itOn: false`
        .map((item) => item.id)
    );

    // ✅ กรองเมนูที่ `parentId` เชื่อมโยงกับเมนู `itOn: false`
    const filteredMenuItems = allMenuItems.filter((item) => !excludedParentIds.has(item.parentId ?? ""));

    // ✅ ถ้าส่ง `id` มา ให้ดึงเฉพาะเมนูที่ `id` ตรงกัน
    if (id && typeof id === "string") {
      const menuHead = filteredMenuItems.find((item) => item.id === id);
      if (!menuHead) {
        return res.status(404).json({ success: false, error: "Menu not found." });
      }

      // ✅ หา `submenu` ที่มี `parentId` ตรงกับ `id`
      const submenu = filteredMenuItems.filter((item) => item.parentId === id);

      const extendedMenu: ExtendedMenuPageWebDB = {
        ...menuHead,
        submenu,
      };

      return res.status(200).json({ success: true, data: extendedMenu });
    }

    // ✅ ถ้าไม่มี `id` ให้ดึงเฉพาะเมนูหลักที่ `itOn: true`
    const menuWithSubmenus: ExtendedMenuPageWebDB[] = filteredMenuItems
      .filter((menu) => menu.parentId === null) // ✅ ดึงเมนูหลัก
      .map((menu) => ({
        ...menu,
        submenu: filteredMenuItems.filter((sub) => sub.parentId === menu.id), // ✅ ดึงเมนูที่มี `parentId` ตรงกัน
      }));

    return res.status(200).json({ success: true, data: menuWithSubmenus });
  } catch (error) {
    console.error("🚨 Error fetching menu items:", error);
    res.status(500).json({ success: false, error: "Error fetching menu items" });
  }
}
async function putMenuPageWeb(req: NextApiRequest, res: NextApiResponse) {
  const {
    id,
    canAdvance,
    canViews,
    canCreate,
    canUpdate,
    canDelete,
    updatedBy,
  } = req.body;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ success: false, message: "Missing or invalid id" });
  }

  try {
    const updatedPageWeb = await prisma.menuPageWebDB.update({
      where: { id },
      data: {
        canAdvance: Boolean(canAdvance),
        canViews: Boolean(canViews),
        canCreate: Boolean(canCreate),
        canUpdate: Boolean(canUpdate),
        canDelete: Boolean(canDelete),
        updatedBy: updatedBy || "system",
        updatedAt: new Date(),
      },
    });

    return res.status(200).json({ success: true, data: updatedPageWeb });
  } catch (error: any) {
    console.error("❌ PUT /api/menupageweb/[id] error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message || "Error updating permissions",
    });
  }
}