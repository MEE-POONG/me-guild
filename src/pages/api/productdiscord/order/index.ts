import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "GET":
        return await getOrders(req, res);
      case "POST":
        return await postOrder(req, res);
      case "PUT":
        return await putOrder(req, res);
      case "DELETE":
        return await deleteOrder(req, res);
      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("🚨 API Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// ✅ 1. ดึงข้อมูลคำสั่งซื้อทั้งหมด
async function getOrders(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, keyword = "" } = req.query;
    if (id) {
      const order = await prisma.orderDB.findUnique({
        where: { id: id as string },
        include: {
          items: {
            include: {
              product: true, // จอย product ของแต่ละรายการ
              recipient: true,
            },
          },
        },
      });

      if (!order) {
        return res.status(404).json({ success: false, error: "order not found." });
      }

      // ✅ ดึงข้อมูลผู้ซื้อจาก UserDB โดยใช้ discord_id
      const buyer = await prisma.userDB.findUnique({
        where: {
          id: order.buyerDiscordID,
        },
      });

      // ✅ ดึงข้อมูลผู้ขายจาก AdminDB โดยใช้ id
      const seller = await prisma.adminDB.findUnique({
        where: {
          id: order.sellerID,
        },
        include: {
          UserDB: true,
          serverDB: true,
          AdminPositionDB: true,
        },
      });

      return res.status(200).json({
        success: true,
        order,
        buyer,  // ✅ เพิ่มข้อมูลผู้ซื้อ
        seller, // ✅ เพิ่มข้อมูลผู้ขาย (พร้อมจอยตำแหน่งและเซิร์ฟเวอร์)
      });
    }

    const orders = await prisma.orderDB.findMany({
      where: {
        OR: [
          { buyerDiscordID: { contains: String(keyword), mode: "insensitive" } },
          { name: { contains: String(keyword), mode: "insensitive" } },
          { email: { contains: String(keyword), mode: "insensitive" } },
          { tel: { contains: String(keyword), mode: "insensitive" } },
        ],
      },
      include: {
        items: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("🚨 Error fetching orders:", error);
    return res.status(500).json({ message: "Error fetching orders" });
  }
}

// ✅ 2. สร้างคำสั่งซื้อใหม่
async function postOrder(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { buyerDiscordID, name, email, tel, totalPrice, paymentSlip, sellerID, sellerName, createdBy, items } = req.body;

    if (!buyerDiscordID || !name || !email || !totalPrice || !sellerID || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = await prisma.orderDB.create({
      data: {
        buyerDiscordID,
        name,
        email,
        tel,
        totalPrice,
        sellerID,
        sellerName,
        createdBy,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            pricePerItem: item.pricePerItem,
            totalPrice: item.quantity * item.pricePerItem,
          })),
        },
      },
      include: { items: true },
    });


    return res.status(201).json(order);
  } catch (error) {
    console.error("🚨 Error creating order:", error);
    return res.status(500).json({ message: "Error creating order" });
  }
}

// ✅ 3. อัปเดตสถานะออเดอร์
async function putOrder(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { orderId, status, updatedBy } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = await prisma.orderDB.update({
      where: { id: orderId },
      data: {
        updatedBy,
      },
    });

    return res.status(200).json(order);
  } catch (error) {
    console.error("🚨 Error updating order:", error);
    return res.status(500).json({ message: "Error updating order" });
  }
}

// ✅ 4. ลบคำสั่งซื้อ
async function deleteOrder(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { orderId, deleteBy } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "Missing orderId" });
    }

    await prisma.orderDB.update({
      where: { id: orderId },
      data: {
        deleteBy,
      },
    });

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("🚨 Error deleting order:", error);
    return res.status(500).json({ message: "Error deleting order" });
  }
}
