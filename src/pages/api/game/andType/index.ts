import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
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

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { page = 1, pageSize = 10, game_name = "", selectID = "" } = req.query;

    try {
        let games = [];
        let totalGames = 0;

        if (selectID) {
            // Fetch a single game by selectID
            const game = await prisma.gameOnlineDB.findUnique({
                where: {
                    id: selectID as string,
                },
            });

            if (!game) {
                return res.status(404).json({ success: false, error: "Game not found." });
            }

            games = [game];
            totalGames = 1; // Since we are only fetching one game
        } else {
            // Fetch games with pagination and search
            games = await prisma.gameOnlineDB.findMany({
                where: {
                    game_name: {
                        contains: game_name as string,
                        mode: 'insensitive',
                    },
                },
                skip: (Number(page) - 1) * Number(pageSize),
                take: Number(pageSize),
                orderBy: {
                    createdAt: 'desc',
                },
            });

            // Count total games for pagination
            totalGames = await prisma.gameOnlineDB.count({
                where: {
                    game_name: {
                        contains: game_name as string,
                        mode: 'insensitive',
                    },
                },
            });
        }

        // Extract game IDs for fetching related game types
        const gameIds = games.map((game) => game.id);

        // Fetch related game type mappings
        const gameTypeMappings = await prisma.gameTypeGame.findMany({
            where: {
                gameId: {
                    in: gameIds,
                },
            },
        });

        // Extract unique type IDs from mappings
        const typeIds = gameTypeMappings.map((mapping) => mapping.typeId);
        const filteredTypeIds = typeIds.filter((id): id is string => id !== null);
        // Fetch type details from GameTypeDB
        const gameTypes = await prisma.gameTypeDB.findMany({
            where: {
                id: {
                    in: filteredTypeIds,
                },
            },
        });

        // Join game types to games manually
        const gamesWithTypes = games.map((game) => {
            const relatedTypes = gameTypeMappings
                .filter((mapping) => mapping.gameId === game.id)
                .map((mapping) => {
                    const typeDetails = gameTypes.find((type) => type.id === mapping.typeId);
                    return {
                        typeId: mapping.typeId,
                        title: typeDetails?.title || null,
                        createdBy: mapping.createdBy,
                        updatedBy: mapping.updatedBy,
                        deleteBy: mapping.deleteBy,
                    };
                });

            return {
                ...game,
                gameTypes: relatedTypes,
            };
        });

        res.status(200).json({
            success: true,
            exportDB: JSON.parse(
                JSON.stringify(gamesWithTypes, (_, value) => (typeof value === "bigint" ? Number(value) : value))
            ),
            pagination: selectID
                ? null
                : {
                    totalPages: Math.ceil(totalGames / Number(pageSize)),
                    currentPage: Number(page),
                    totalItems: totalGames,
                },
        });
    } catch (error) {
        console.error("Error fetching online games with related types:", error);
        res.status(500).json({ success: false, error: "Error fetching online games." });
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { logo, game_name, partyLimit, ranking, numberMatch, createdBy, createdAt, gameTypes } = req.body;

    try {

        // ตรวจสอบว่ามีเกมชื่อเดียวกันในระบบหรือไม่
        const existingGame = await prisma.gameOnlineDB.findFirst({
            where: { game_name: game_name },
        });

        if (existingGame) {
            return res.status(400).json({ success: false, error: "Game name already exists." });
        }

        // ✅ ตรวจสอบค่า `partyLimit`
        const partyLimitValue = typeof partyLimit === "number" ? BigInt(partyLimit) : BigInt(1);

        // ✅ เพิ่มเกม
        const exportDB = await prisma.gameOnlineDB.create({
            data: {
                logo,
                game_name,
                partyLimit: partyLimitValue,
                ranking,
                numberMatch,
                createdBy,
                createdAt: createdAt ? new Date(createdAt) : new Date(),
                updatedBy: createdBy || '',
                updatedAt: new Date(),
                deleteBy: '',
            },
        });


        // ✅ ตรวจสอบ gameTypes ไม่ให้มีค่า `null`
        const validGameTypes = Array.isArray(gameTypes) ? gameTypes.filter(Boolean) : [];

        if (validGameTypes.length > 0) {

            const gameTypeEntries = validGameTypes.map((typeId: string) => ({
                gameId: exportDB.id,
                typeId,
                createdBy,
                updatedBy: createdBy || '',
                deleteBy: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            }));

            await prisma.gameTypeGame.createMany({
                data: gameTypeEntries,
            });

        }

        // ✅ **แปลง `BigInt` เป็น `Number` ก่อนส่ง JSON**
        return res.status(200).json({
            success: true,
            exportDB: {
                ...exportDB,
                partyLimit: Number(exportDB.partyLimit), // 👈 แปลงเป็น `Number`
            },
        });
    } catch (error) {
        console.error("❌ Error creating game:", error);
        return res.status(500).json({ success: false, error: error instanceof Error ? error.message : "Unknown error" });
    }
}



async function handlePut(req: NextApiRequest, res: NextApiResponse) {
    const { id, logo, game_name, partyLimit, ranking, numberMatch, updatedBy, gameTypes } = req.body;
    try {
        // ✅ อัปเดตข้อมูลหลักของเกม
        const exportDB = await prisma.gameOnlineDB.update({
            where: { id },
            data: {
                logo,
                game_name,
                partyLimit: BigInt(partyLimit),
                ranking,
                numberMatch,
                updatedBy,
                updatedAt: new Date(),
            },
        });

        // ✅ ลบ gameTypes เดิมก่อน
        await prisma.gameTypeGame.deleteMany({
            where: { gameId: id },
        });

        // ✅ ตรวจสอบและเพิ่ม gameTypes ใหม่
        const validGameTypes = Array.isArray(gameTypes) ? gameTypes.filter(Boolean) : [];

        if (validGameTypes.length > 0) {
            const gameTypeEntries = validGameTypes.map((typeId: string) => ({
                gameId: id,
                typeId,
                createdBy: updatedBy || '',
                updatedBy: updatedBy || '',
                deleteBy: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            }));

            await prisma.gameTypeGame.createMany({
                data: gameTypeEntries,
            });
        }

        // ✅ ส่งข้อมูลกลับพร้อมแปลง BigInt
        res.status(200).json({
            success: true,
            data: {
                ...exportDB,
                partyLimit: Number(exportDB.partyLimit),
            },
        });
    } catch (error) {
        console.error("❌ Error updating game:", error);
        res.status(500).json({ success: false, error: "Error updating online game." });
    }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, error: "Game ID is required." });
    }

    try {
        // Start a transaction to delete related data
        await prisma.$transaction(async (prisma) => {
            // Delete related GameRankDB entries
            const gameRankDeletionCount = await prisma.gameRankDB.deleteMany({
                where: { gameId: id },
            });

            // Delete related GameTypeGame entries
            const gameTypeDeletionCount = await prisma.gameTypeGame.deleteMany({
                where: { gameId: id },
            });

            // Delete the GameOnlineDB entry
            const deletedGame = await prisma.gameOnlineDB.delete({
                where: { id },
            });

        });

        return res.status(204).end(); // No content after successful deletion
    } catch (error) {
        console.error("Error deleting game and related data:", error);

        // Handle specific Prisma errors
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return res.status(404).json({ success: false, error: `Game with ID ${id} not found.` });
            }
        }

        // Generic error response
        return res.status(500).json({ success: false, error: "Error deleting  GameOnline and related data." });
    }
}

