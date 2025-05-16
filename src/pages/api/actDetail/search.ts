import { PrismaClient, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface QueryParams {
  page?: string;
  pageSize?: string;
  keyword?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      await handleGET(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page = '1', pageSize = '10', keyword } = req.query as QueryParams;

    const pageNum = parseInt(page, 10) || 1;
    const pageSizeNum = parseInt(pageSize, 10) || 10;

    const skip = (pageNum - 1) * pageSizeNum;
    const take = pageSizeNum;

    const whereConditions: Prisma.ActDetailDBWhereInput[] = [];

    whereConditions.push({ deleteBy: '' });

    if (keyword && keyword.length >= 3) {
      whereConditions.push({
        title: { contains: keyword, mode: Prisma.QueryMode.insensitive },
      });
    }

    const whereClause: Prisma.ActDetailDBWhereInput = {
      AND: whereConditions,
    };

    const [activities, totalActivitiesCount] = await Promise.all([
      prisma.actDetailDB.findMany({
        where: whereClause,
        skip,
        take,
      }),
      prisma.actDetailDB.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalActivitiesCount / pageSizeNum);

    res.status(200).json({
      success: true,
      data: activities,
      pagination: {
        total: totalActivitiesCount,
        totalPages,
        page: pageNum,
        pageSize: pageSizeNum,
      },
    });
  } catch (error) {
    console.error("Error fetching game categories:", error);
    res.status(500).json({ message: "Error fetching game categories" });
  }
}
