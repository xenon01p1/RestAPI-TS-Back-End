import db from "../connection.js";
import type { RowDataPacket } from "mysql2";
import type { User, FilterUser } from "../types/userTypes.js";

const ALLOWED_COLUMNS = [
  "id",
  "username",
  "password",
  "refresh_token"
];

export const findUser = async (filters: FilterUser): Promise<User | null> => {
    const keys = Object.keys(filters).filter(
        (key): key is keyof User => ALLOWED_COLUMNS.includes(key)
    );

    if (keys.length === 0) {
        throw new Error("No valid filter provided")
    }

    const whereClause = keys
        .map(key => `${ key } = ?`)
        .join(" AND ");

    const values = keys.map(key => filters[key]);

    const [rows] = await db.query<RowDataPacket[]>(
        `SELECT * FROM users WHERE ${whereClause}`,
        values
    );

    return rows.length ? (rows[0] as User) : null;
}