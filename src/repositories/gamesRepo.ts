import db from "../connection.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import type { Game } from "../schemas/gamesSchemas.js";
import type { PatchGameInput } from "../types/gameTypes.js";

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

export const patchGameRepo = async (
  id: number,
  data: PatchGameInput
): Promise<ResultSetHeader> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  (Object.entries(data) as [keyof PatchGameInput, unknown][]).forEach(
    ([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
  );

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  const [result] = await db.query<ResultSetHeader>(
    `
    UPDATE games
    SET ${fields.join(", ")}
    WHERE id = ?
    `,
    [...values, id]
  );

  return result;
};

export const deleteGameRepo = async (id: number) => {
  const [result] = await db.query<ResultSetHeader>(
    `DELETE FROM games WHERE id = ?`, 
    [id]
  );

  return result;
}

