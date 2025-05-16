import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "GET":
        return await getProducts(req, res);
      case "POST":
        return await createProduct(req, res);
      case "PUT":
        return await updateProduct(req, res);
      case "DELETE":
        return await deleteProduct(req, res);
      default:
        return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("🚨 API Error:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page = 1, pageSize = 10, keyword = "" } = req.query;

    const skip = (Number(page) - 1) * Number(pageSize);
    const take = Number(pageSize);

    // ✅ ค้นหาสินค้าตาม keyword
    const products = await prisma.productDiscordDB.findMany({
      where: keyword
        ? {
          OR: [
            { name: { contains: String(keyword), mode: "insensitive" } }, // ค้นหาจากชื่อสินค้า
            { description: { contains: String(keyword), mode: "insensitive" } }, // ค้นหาจากคำอธิบาย
          ],
        }
        : {}, // ถ้าไม่มี keyword ให้แสดงสินค้าทั้งหมด
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });

    // ✅ นับจำนวนสินค้าทั้งหมดที่ตรงกับ keyword
    const totalProducts = await prisma.productDiscordDB.count({
      where: keyword
        ? {
          OR: [
            { name: { contains: String(keyword), mode: "insensitive" } },
            { description: { contains: String(keyword), mode: "insensitive" } },
          ],
        }
        : {},
    });

    return res.status(200).json({
      success: true,
      data: products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / Number(pageSize)),
      currentPage: Number(page),
    });

  } catch (error) {
    console.error("🚨 Error fetching products:", error);
    return res.status(500).json({ success: false, error: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า" });
  }
}

async function createProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, img, description, discordServerID, type, roleId, price, createdBy } = req.body;

    if (!name || !discordServerID || !type || !price) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const data: any = { name, img, description, discordServerID, type, price: Number(price), createdBy };
    if (roleId) {
      data.roleId = roleId;
    }

    const existingProduct = roleId
      ? await prisma.productDiscordDB.findFirst({
        where: { discordServerID, roleId },
      })
      : null;

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        error: "Product with this role already exists in the server",
      });
    }
    const newProduct = await prisma.productDiscordDB.create({ data });

    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("🚨 Error creating product:", error);
    return res.status(500).json({ success: false, error: "Error creating product" });
  }
}

async function updateProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, name, img, description, type, roleId, price, updatedBy } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, error: "Product ID is required" });
    }

    const existingProduct = await prisma.productDiscordDB.findUnique({ where: { id } });
    if (!existingProduct) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    const data: any = { name, img, description, type, price: Number(price), updatedBy };
    if (roleId) {
      data.roleId = roleId;
    }

    const updatedProduct = await prisma.productDiscordDB.update({
      where: { id },
      data,
    });

    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("🚨 Error updating product:", error);
    return res.status(500).json({ success: false, error: "Error updating product" });
  }
}

async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, error: "Product ID is required" });
    }

    const existingProduct = await prisma.productDiscordDB.findUnique({ where: { id } });
    if (!existingProduct) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    await prisma.productDiscordDB.delete({ where: { id } });
    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("🚨 Error deleting product:", error);
    return res.status(500).json({ success: false, error: "Error deleting product" });
  }
}
