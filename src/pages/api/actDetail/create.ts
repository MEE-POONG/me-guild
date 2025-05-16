// /pages/api/activities/create.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const activitiesData = req.body;

                if (!Array.isArray(activitiesData)) {
                    res.status(400).json({ error: "Invalid data format. Expected an array of activities." });
                    return;
                }
                const createdActivities = await prisma.actDetailDB.createMany({
                    data: activitiesData.map((activity: any) => ({
                        title: activity.title,
                        point: activity.point,
                        type: activity.type,
                        img: activity.img,
                        startdate: activity.startdate,
                        enddate: activity.enddate,
                        description: activity.description,
                        disname: activity.disname,
                        dislink: activity.dislink,
                        createdAt: new Date(),  // ✅ เพิ่มค่า createdAt
                        updatedAt: new Date(),  // ✅ เพิ่มค่า updatedAt
                        createdBy: 'system', // หรือใช้ค่า activity.createdBy ถ้ามี
                        updatedBy: '',
                        deleteBy: '',
                        actTypeId: activity.actTypeId || "", // ✅ ต้องกำหนด actTypeId (หากไม่มีให้ใส่ค่าว่าง)
                    })),
                });

                res.status(201).json(createdActivities);
            } catch (error) {
                console.error("Error creating activities:", error);
                res.status(500).json({ error: "An error occurred while creating the activities." });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);





















             
    }
}