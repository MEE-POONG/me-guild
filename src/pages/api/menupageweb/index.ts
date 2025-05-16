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
        return await getMenuPageWebs(req, res);
      case "POST":
        return await postMenuPageWeb(req, res);
      case "PUT":
        return await putMenuPageWeb(req, res);
      case "DELETE":
        return await deleteMenuPageWeb(req, res);
      default:
        return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

// ✅ 1. ดึงข้อมูลหน้าเว็บทั้งหมด (GET /api/pageweb)
async function getMenuPageWebs(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page = "1", pageSize = "10", keyword = "", id, parent } = req.query;

    // ✅ Convert query parameters
    const pageNum = parseInt(page as string, 10) || 1;
    const pageSizeNum = parseInt(pageSize as string, 10) || 10;
    const skip = (pageNum - 1) * pageSizeNum;

    // ✅ ตรวจสอบ `id` และ `parent`
    let parentIdFilter: any = undefined;
    let menuHead: any = null; // ✅ กำหนดตัวแปร `menuHead` ล่วงหน้า

    if (parent === "true") {
      parentIdFilter = { not: null }; // ดึงเมนูที่มี parentId (เมนูย่อย)
    } else if (parent === "false") {
      parentIdFilter = null; // ดึงเมนูหลัก (ไม่มี parentId)
    } else if (id && typeof id === "string" && id.trim() !== "") {
      parentIdFilter = id; // ดึงเมนูที่มี parentId = id
    }

    // ✅ ดึงข้อมูล `head` ถ้ามี `id`
    if (id && typeof id === "string") {
      menuHead = await prisma.menuPageWebDB.findUnique({
        where: { id: id },
      });
    }

    // ✅ เงื่อนไขการค้นหา
    const whereClause: any = {
      OR: [
        { link: { contains: keyword as string, mode: "insensitive" } },
        { name: { contains: keyword as string, mode: "insensitive" } },
      ],
      parentId: parentIdFilter,
    };

    // ✅ ดึงข้อมูลเมนู พร้อมเรียงลำดับตาม priority
    const menuItems = await prisma.menuPageWebDB.findMany({
      where: whereClause,
      skip,
      take: pageSizeNum,
      orderBy: [{ showOrder: "asc" }], // เรียงตาม priority
      include: {
        AdminDefaultPermissionDB: true,
      },
    });

    return res.status(200).json({
      success: true,
      head: menuHead, // ✅ คืนค่า head กลับไปด้วย
      data: menuItems,
      pagination: {
        totalItems: menuItems.length,
        totalPages: Math.ceil(menuItems.length / pageSizeNum),
        currentPage: pageNum,
        pageSize: pageSizeNum,
      },
    });
  } catch (error) {
    console.error("🚨 Error fetching menu items:", error);
    res.status(500).json({ success: false, error: "Error fetching menu items" });
  }
}


// ✅ 2. เพิ่มข้อมูลหน้าเว็บใหม่ (POST /api/pageweb)
async function postMenuPageWeb(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, description, head, link, icon, manager, parentId, createdBy } = req.body;


    let newPriority = 1;
    let finalParentId = parentId && typeof parentId === "string" && parentId.trim() !== "" ? parentId : null;

    // ✅ ถ้าไม่มี parentId → ตั้งค่า head = true
    const isHead = finalParentId === null ? true : head;

    // ✅ หา priority สูงสุดใน parentId เดียวกัน
    const lastMenu = await prisma.menuPageWebDB.findFirst({
      where: { parentId: finalParentId },
    });


    const data: any = {
      name,
      description,
      head: isHead, // ✅ ใช้ค่า head ที่คำนวณแล้ว
      link,
      icon,
      parentId: finalParentId, // ✅ ใช้ parentId ที่ถูกต้อง
      createdBy,
      createdAt: new Date(),
      updatedBy: createdBy || '',
      updatedAt: new Date(),
      deleteBy: '',
    };

    // ✅ ถ้า manager เป็นค่าว่าง หรือเป็น [""] จะไม่ถูกส่งไปที่ Prisma
    if (Array.isArray(manager)) {
      const cleanedManager = manager.filter((item) => item.trim() !== ""); // ลบค่า [""] ออก
      if (cleanedManager.length > 0) {
        data.manager = cleanedManager;
      }
    } else if (typeof manager === "string" && manager.trim() !== "") {
      data.manager = manager.split(",").map((item: string) => item.trim());
    }

    // ✅ บันทึกข้อมูลลงฐานข้อมูล
    const newPageWeb = await prisma.menuPageWebDB.create({ data });


    // ✅ ถ้า parentId มีค่า → ต้องอัปเดต `subMenu` ของ `parentId`
    if (finalParentId) {
      // ✅ ดึงข้อมูลเมนูหลัก (parent) ที่มี id ตรงกับ parentId
      const parentMenu = await prisma.menuPageWebDB.findUnique({
        where: { id: finalParentId },
        select: { subMenu: true }, // ✅ ดึง subMenu เท่านั้น
      });

      if (parentMenu) {
        const updatedSubMenu = [...(parentMenu.subMenu ?? []), newPageWeb.id]; // ✅ เพิ่ม id ของเมนูใหม่เข้าไป

        // ✅ อัปเดต subMenu ของ parentId
        await prisma.menuPageWebDB.update({
          where: { id: finalParentId },
          data: { subMenu: updatedSubMenu },
        });

      }
    }

    return res.status(201).json({ success: true, data: newPageWeb });
  } catch (error) {
    console.error("🚨 Error creating page web item:", error);
    return res.status(500).json({ success: false, error: `Error creating page web item: ${error}` });
  }
}

// ✅ 3. แก้ไขข้อมูลหน้าเว็บ (PUT /api/pageweb?id=xxx)
async function putMenuPageWeb(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const {
      name,
      description,
      head,
      itOn,
      link,
      icon,
      manager,
      parentId,
      updatedBy
    } = req.body;


    const updatedPageWeb = await prisma.menuPageWebDB.update({
      where: { id: id as string },
      data: {
        name,
        description,
        head,
        itOn,
        link,
        icon,
        manager: typeof manager === "string"
          ? manager.split(",").map((s) => s.trim())
          : Array.isArray(manager)
            ? manager
            : [],
        parentId: parentId || null,
        updatedBy,
        updatedAt: new Date(),
      },
    });

    return res.status(200).json({ success: true, data: updatedPageWeb });
  } catch (error: any) {
    console.error("❌ PUT /api/menupageweb error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message || "Error updating page web item",
    });
  }
}



// ✅ 4. ลบข้อมูลหน้าเว็บ (DELETE /api/pageweb?id=xxx)
async function deleteMenuPageWeb(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    await prisma.menuPageWebDB.delete({
      where: { id: id as string },
    });

    return res.status(200).json({ success: true, message: "Page web item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Error deleting page web item" });
  }
}
