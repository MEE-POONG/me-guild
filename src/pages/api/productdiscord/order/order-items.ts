import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "POST":
        return await addOrderItem(req, res);
      case "GET":
        return await getOrderItems(req, res);
      case "PUT":
        return await updateOrderItem(req, res);
      case "DELETE":
        return await deleteOrderItem(req, res);
      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// ✅ 1. เพิ่มสินค้าในออเดอร์
async function addOrderItem(req: NextApiRequest, res: NextApiResponse) {
  const { orderId, productId, quantity, pricePerItem, recipientId } = req.body;

  if (!orderId || !productId || !quantity || pricePerItem === undefined || !recipientId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const totalPrice = parseFloat((quantity * parseFloat(pricePerItem)).toFixed(2));

  const orderItem = await prisma.orderItemDB.create({
    data: {
      orderId,
      productId,
      recipientId,
      quantity,
      pricePerItem: parseFloat(pricePerItem),
      totalPrice,
    },
  });

  return res.status(201).json(orderItem);
}

// ✅ 2. ดึงข้อมูลสินค้าทั้งหมดในออเดอร์
async function getOrderItems(req: NextApiRequest, res: NextApiResponse) {
  const { orderId } = req.query;

  if (!orderId) {
    return res.status(400).json({ message: "Missing orderId" });
  }

  const orderItems = await prisma.orderItemDB.findMany({
    where: { orderId: String(orderId) },
    include: { product: true },
  });

  return res.status(200).json(orderItems);
}

// ✅ 3. อัปเดตจำนวนสินค้าที่สั่งซื้อ
async function updateOrderItem(req: NextApiRequest, res: NextApiResponse) {
  const { itemId, quantity, pricePerItem } = req.body;

  if (!itemId || !quantity || pricePerItem === undefined) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const totalPrice = parseFloat((quantity * parseFloat(pricePerItem)).toFixed(2));

  const updatedItem = await prisma.orderItemDB.update({
    where: { id: itemId },
    data: {
      quantity,
      pricePerItem: parseFloat(pricePerItem),
      totalPrice,
    },
  });

  return res.status(200).json(updatedItem);
}

// ✅ 4. ลบสินค้าจากออเดอร์
async function deleteOrderItem(req: NextApiRequest, res: NextApiResponse) {
  const { itemId } = req.body;

  if (!itemId) {
    return res.status(400).json({ message: "Missing itemId" });
  }

  await prisma.orderItemDB.delete({
    where: { id: itemId },
  });

  return res.status(200).json({ message: "Order item deleted successfully" });
}
