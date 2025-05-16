import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                return await getPayment(req, res);
            case "POST":
                return await postPayment(req, res);
            case "PUT":
                return await putPayment(req, res);
            case "DELETE":
                return await deletePayment(req, res);
            default:
                return res.status(405).json({ message: "Method not allowed" });
        }
    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// ✅ GET
async function getPayment(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (id) {
        const payment = await prisma.paymentDB.findUnique({
            where: { id: String(id) },
        });
        if (!payment) return res.status(404).json({ message: "Payment not found" });
        return res.status(200).json(payment);
    }

    const payments = await prisma.paymentDB.findMany({
        orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(payments);
}

// ✅ POST
async function postPayment(req: NextApiRequest, res: NextApiResponse) {
    const {
        orderId,
        paymentSlip,
        paymentMethod,
        auditorID,
        auditorName,
        createdBy,
    } = req.body;

    if (!orderId || !paymentSlip || !paymentMethod) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const payment = await prisma.paymentDB.create({
            data: {
                orderId,
                paymentSlip,
                paymentMethod,
                auditorID,
                auditorName,
                createdBy,
            },
        });

        return res.status(201).json(payment);
    } catch (error) {
        console.error("❌ POST payment error:", error);
        return res.status(500).json({ message: "Failed to create payment" });
    }
}

// ✅ PUT
async function putPayment(req: NextApiRequest, res: NextApiResponse) {
    const { id, ...updateData } = req.body;

    if (!id) return res.status(400).json({ message: "Missing payment ID" });

    try {
        const existing = await prisma.paymentDB.findUnique({ where: { id } });
        if (!existing) return res.status(404).json({ message: "Payment not found" });

        const updated = await prisma.paymentDB.update({
            where: { id },
            data: updateData, // รองรับการอัปเดต orderId, paymentSlip ฯลฯ
        });

        return res.status(200).json(updated);
    } catch (error) {
        console.error("❌ PUT payment error:", error);
        return res.status(500).json({ message: "Failed to update payment" });
    }
}

// ✅ DELETE
async function deletePayment(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    if (!id) return res.status(400).json({ message: "Missing payment ID" });

    try {
        await prisma.paymentDB.delete({ where: { id } });
        return res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error) {
        console.error("❌ DELETE payment error:", error);
        return res.status(500).json({ message: "Failed to delete payment" });
    }
}
