import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            await handleGet(req, res);
            break;
        case 'POST':
            await handlePost(req, res);
            break;
        case 'PUT':
            await handlePut(req, res);
            break;
        case 'DELETE':
            await handleDelete(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

// Fetch all records (GET)
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    try {
        const exportDB = await prisma.webDefaultDB.findFirst(); // Fetch the first record only
        res.status(200).json({ success: true, exportDB });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error fetching record." });
    }
}

// Create a new record (POST)
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { logoSquare, logoCircle, logoWide, createdBy } = req.body;

    try {
        // ตรวจสอบว่ามีข้อมูลอยู่แล้วหรือไม่
        const existingRecord = await prisma.webDefaultDB.findFirst();

        if (existingRecord) {
            // หากข้อมูลมีอยู่แล้ว ให้ส่งกลับข้อมูลเดิมและไม่สร้างใหม่
            return res.status(200).json({
                success: false,
                message: "Record already exists.",
                data: existingRecord
            });
        }

        // หากไม่มีข้อมูล ให้สร้างใหม่
        const exportDB = await prisma.webDefaultDB.create({
            data: {
                logoSquare,
                logoCircle,
                logoWide,
                createdBy,
                updatedBy: createdBy || '',
                deleteBy: '',
            },
        });

        res.status(201).json({ success: true, exportDB });
    } catch (error) {
        console.error("Error creating new record:", error);
        res.status(500).json({ success: false, error: "Error creating new record." });
    }
}


// Update an existing record (PUT)
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        return res.status(405).json({ success: false, error: "Method not allowed." });
    }

    const {
        id,
        logoSquare,
        logoCircle,
        logoWide,
        defaultImg,
        defaultProfile,
        facebook,
        instagram,
        youtube,
        tiktok,
        gmail,
        updatedBy,
    } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, error: "ID is required." });
    }

    try {
        const updatedRecord = await prisma.webDefaultDB.update({
            where: { id },
            data: {
                ...(logoSquare !== undefined && { logoSquare }),
                ...(logoCircle !== undefined && { logoCircle }),
                ...(logoWide !== undefined && { logoWide }),
                ...(defaultImg !== undefined && { defaultImg }),
                ...(defaultProfile !== undefined && { defaultProfile }),
                ...(facebook !== undefined && { facebook }),
                ...(instagram !== undefined && { instagram }),
                ...(youtube !== undefined && { youtube }),
                ...(tiktok !== undefined && { tiktok }),
                ...(gmail !== undefined && { gmail }),
                updatedBy,
                updatedAt: new Date(),
            },
        });

        res.status(200).json({ success: true, exportDB: updatedRecord });
    } catch (error) {
        console.error("Error updating record:", error);
        res.status(500).json({ success: false, error: "Error updating record." });
    }
}


// Hard delete a record (DELETE)
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    try {
        await prisma.webDefaultDB.delete({
            where: { id },
        });

        res.status(204).end(); // Use 204 No Content for successful deletion with no response body
    } catch (error) {
        console.error("Error deleting record:", error);
        res.status(500).json({ success: false, error: "Error deleting record." });
    }
}
