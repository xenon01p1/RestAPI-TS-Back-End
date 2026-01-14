import db from "../connection.js";
import type { RowDataPacket } from "mysql2";
import type { User, FilterUser, UpdateUser } from "../types/userTypes.js";
import type { CreateUser } from "../types/userTypes.js";

const ALLOWED_COLUMNS = [
  "id",
  "username",
  "password",
  "refresh_token"
];

const UPDATE_COLUMNS = ["username", "password", "refreshToken"] as const;
type UpdateColumn = (typeof UPDATE_COLUMNS)[number];

const FILTER_COLUMNS = ["id", "username", "password", "refreshToken"] as const;
type FilterColumn = (typeof FILTER_COLUMNS)[number];

const isUpdateColumn = (key: string): key is UpdateColumn =>
  UPDATE_COLUMNS.includes(key as UpdateColumn);

const isFilterColumn = (key: string): key is FilterColumn =>
  FILTER_COLUMNS.includes(key as FilterColumn);


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

export const insertUser = async (
  username: string,
  password: string
): Promise<number> => {
  const [result] = await db.query<any>(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, password]
  );

  return result.insertId;
};

export const updateUser = async (
  updateValues: UpdateUser,
  condition: FilterUser
): Promise<void> => {
  const updateKeys = Object.keys(updateValues).filter(isUpdateColumn);
  const conditionKeys = Object.keys(condition).filter(isFilterColumn);

  if (updateKeys.length === 0) {
    throw new Error("Update values not valid");
  }

  if (conditionKeys.length === 0) {
    throw new Error("Condition values not valid");
  }

  const setClause = updateKeys
    .map(key => `${key} = ?`)
    .join(", ");

  const whereClause = conditionKeys
    .map(key => `${key} = ?`)
    .join(" AND ");

  const values = [
    ...updateKeys.map(key => updateValues[key]),
    ...conditionKeys.map(key => condition[key]),
  ];

  await db.query(
    `UPDATE users SET ${setClause} WHERE ${whereClause}`,
    values
  );
};



