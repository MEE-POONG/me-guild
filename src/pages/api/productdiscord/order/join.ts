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
        return await updateOrder(req, res);
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

// ✅ GET: join Order + Item + Product + Payment
async function getOrders(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, keyword = "" } = req.query;
    if (id) {
      const order = await prisma.orderDB.findUnique({
        where: { id: id as string },
        include: {
          items: {
            include: {
              product: true,
              recipient: true,
            },
          },
          payment: true, // ✅ ชื่อฟิลด์ตาม model ไม่ใช่ "payment"
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

// ✅ POST: สร้าง Order และ Items
async function postOrder(req: NextApiRequest, res: NextApiResponse) {
  const { buyerDiscordID, name, email, tel, sellerID, sellerName, totalPrice, items, status } = req.body;

  if (!buyerDiscordID || !name || !email || !sellerID || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: "ข้อมูลไม่ครบถ้วน" });
  }

  // ตรวจสอบสถานะว่าถูกต้องหรือไม่ (optional safety)
  const validStatuses = ["DRAFT"];
  const orderStatus = validStatuses.includes(status) ? status : "DRAFT";
  const createdOrder = await prisma.orderDB.create({
    data: {
      buyerDiscordID,
      name,
      email,
      tel,
      sellerID,
      sellerName,
      totalPrice,
      status,
      items: {
        create: items.map((item: any) => ({
          productId: item.productId,
          recipientId: item.recipientId || buyerDiscordID,
          quantity: Number(item.quantity) || 1,
          pricePerItem: parseFloat(item.pricePerItem?.toString() || "0"),
          totalPrice: parseFloat(item.totalPrice?.toString() || "0"),
        })),
      },
    },
  });

  return res.status(201).json({ success: true, order: createdOrder });
}

// ✅ PUT: อัปเดตคำสั่งซื้อ (เช่น เปลี่ยนสถานะ)
async function updateOrder(req: NextApiRequest, res: NextApiResponse) {
  const { id, status, buyerDiscordID, totalPrice, items } = req.body;
  if (!id || !status || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    // ลบ OrderItem เดิมทั้งหมดก่อน
    await prisma.orderItemDB.deleteMany({
      where: { orderId: id },
    });

    // อัปเดตคำสั่งซื้อและเพิ่มรายการใหม่
    const updated = await prisma.orderDB.update({
      where: { id },
      data: {
        status,
        totalPrice,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            recipientId: item.recipientId || buyerDiscordID,
            quantity: Number(item.quantity) || 1,
            pricePerItem: parseFloat(item.pricePerItem?.toString() || "0"),
            totalPrice: parseFloat(item.totalPrice?.toString() || "0"),
          })),
        },
      },
    });

    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("❌ updateOrder error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// ✅ DELETE: ลบคำสั่งซื้อ
async function deleteOrder(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    // ✅ ลบรายการสินค้าใน order นั้น ๆ
    await prisma.orderItemDB.deleteMany({ where: { orderId: id } });

    // ✅ ตรวจสอบว่ามี payment ที่เชื่อมกับ order นี้ไหม
    const payment = await prisma.paymentDB.findUnique({
      where: { orderId: id },
    });

    if (payment) {
      await prisma.paymentDB.delete({ where: { id: payment.id } });
    }

    // ✅ ลบ order
    await prisma.orderDB.delete({ where: { id } });

    return res.status(200).json({ success: true, message: "Order deleted" });
  } catch (err) {
    console.error("❌ ลบคำสั่งซื้อไม่สำเร็จ:", err);
    return res.status(500).json({ success: false, message: "ลบคำสั่งซื้อไม่สำเร็จ" });
  }
}