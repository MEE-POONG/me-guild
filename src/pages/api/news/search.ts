import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const { page = '1', pageSize = '10', keyType, keyCategory, keyword } = req.query;
                const pageNum = parseInt(page as string, 10) || 1;
                const pageSizeNum = parseInt(pageSize as string, 10) || 10;
                const skip = (pageNum - 1) * pageSizeNum;
                const whereConditions: any[] = [];

                if (keyword) {
                    whereConditions.push({
                        title: { contains: keyword as string, mode: 'insensitive' }
                    });
                }
                if (keyType) {
                    whereConditions.push({
                        NewsTypeNews: {
                            some: {
                                newsTypeDB: {
                                    title: { contains: keyType as string, mode: 'insensitive' }
                                }
                            }
                        }
                    });
                }
                if (keyCategory) {
                    whereConditions.push({
                        NewsTypeNews: {
                            some: {
                                newsTypeDB: {
                                    newsCategoryDB: {
                                        title: { contains: keyCategory as string, mode: 'insensitive' }
                                    }
                                }
                            }
                        }
                    });
                }

                const newsUpdates = await prisma.newsUpdateDB.findMany({
                    where: { AND: whereConditions },
                    skip,
                    take: pageSizeNum,
                    include: {
                        NewsTypeNews: {
                            include: {
                                newsTypeDB: {
                                    include: {
                                        newsCategoryDB: true
                                    }
                                }
                            }
                        }
                    }
                });

                const totalNewsCount = await prisma.newsUpdateDB.count({ where: { AND: whereConditions } });
                const totalPages = Math.ceil(totalNewsCount / pageSizeNum);

                res.status(200).json({
                    success: true,
                    newsUpdates,
                    pagination: {
                        total: totalNewsCount,
                        totalPages,
                        page: pageNum,
                        pageSize: pageSizeNum
                    }
                });
            } catch (error) {
                console.error("Error fetching news updates:", error);
                res.status(500).json({ message: "Error fetching news updates" });
            }
            break;

       
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
