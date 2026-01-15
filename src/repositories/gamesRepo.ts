import db from "../connection.js";
import type { RowDataPacket } from "mysql2";
import type { Game } from "../schemas/gamesSchemas.js";


export const getGamesRepo = async (): Promise<Game[]> => {
    const [rows] = await db.query(`
        SELECT * FROM games
    `);

    return rows as Game[];
}