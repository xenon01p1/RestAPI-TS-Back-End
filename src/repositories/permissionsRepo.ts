import db from "../connection.js";
import type { RowDataPacket } from "mysql2";
import type { GetPermissions } from "../types/permissionsTypes.js";

export const findPermissionsByUserId = async (userId: number): Promise<GetPermissions[]> => {
    const [rows] = await db.query<RowDataPacket[]>(
        `
        SELECT DISTINCT p.name
        FROM users_roles ur
        JOIN role_permissions rp ON rp.role_id = ur.role_id
        JOIN permissions p ON p.id = rp.permission_id
        WHERE ur.user_id = ?
        `,
        [userId]
    );

    return rows as GetPermissions[];
}

