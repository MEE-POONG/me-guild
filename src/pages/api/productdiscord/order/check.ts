import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "POST":
                return await postCheckOrder(req, res);
            default:
                return res.status(405).json({ message: "Method not allowed" });
        }
    } catch (error) {
        console.error("🚨 API Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const statusToMessage = (status: string): string | undefined => {
    switch (status) {
        case "DRAFT":
            return "❌ ผ้รับมีสินค้าในรายการ 📝 คำสั่งซื้อนี้อยู่ในแบบร่าง กรุณายกเลิกก่อน";
        case "PENDING":
            return "❌ ผ้รับมีสินค้าในรายการ ⏳ รอการชำระเงิน โปรดดำเนินการชำระเงิน";
        case "PAID":
            return "❌ ผ้รับมีสินค้าในรายการ ✅ ชำระเงินเรียบร้อยแล้ว กำลังรอดำเนินการต่อไป";
        case "COMPLETED":
            return "❌ ผ้รับมีสินค้าในรายการ 🎉 คำสั่งซื้อสำเร็จเรียบร้อยแล้ว ขอบคุณที่ใช้บริการ";
        default:
            return undefined;
    }
};

// ✅ POST: ตรวจสอบว่า recipient เคยมี order ซ้ำหรือไม่
async function postCheckOrder(req: NextApiRequest, res: NextApiResponse) {
    const { checks, orderId } = req.body;

    if (!Array.isArray(checks)) {
        return res.status(400).json({ message: "Invalid payload format" });
    }

    try {
        const results = await Promise.all(
            checks.map(async (check) => {
                const match = await prisma.orderItemDB.findFirst({
                    where: {
                        productId: check.productId,
                        recipientId: check.recipientId,
                        ...(orderId && { orderId: { not: orderId } }),
                        order: {
                            status: {
                                not: "CANCELLED",
                            },
                        },
                    },
                    include: {
                        order: true,
                    },
                });

                const checkMessage = match
                    ? `(${statusToMessage(match.order.status)})`
                    : undefined;

                return {
                    ...check,
                    checkMessage,
                };
            })
        );

        return res.status(200).json({ results });
    } catch (error) {
        console.error("/check error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

