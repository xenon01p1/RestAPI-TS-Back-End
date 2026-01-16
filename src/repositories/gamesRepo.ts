import db from "../connection.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import type { Game } from "../schemas/gamesSchemas.js";


export const getGamesRepo = async (): Promise<Game[]> => {
    const [rows] = await db.query<RowDataPacket[]>(`
        SELECT * FROM games
    `);

    return rows as Game[];
}

export const newGameRepo = async (
  title: string,
  genre: string,
  rating: number
): Promise<ResultSetHeader> => {
  const [result] = await db.query<ResultSetHeader>(
    `
    INSERT INTO games (title, genre, rating)
    VALUES (?, ?, ?)
    `,
    [title, genre, rating]
  );

  return result;
};