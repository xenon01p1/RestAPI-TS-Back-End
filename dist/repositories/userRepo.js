import db from "../connection.js";
const ALLOWED_COLUMNS = [
    "id",
    "username",
    "password",
    "refresh_token"
];
export const findUser = async (filters) => {
    const keys = Object.keys(filters).filter((key) => ALLOWED_COLUMNS.includes(key));
    if (keys.length === 0) {
        throw new Error("No valid filter provided");
    }
    const whereClause = keys
        .map(key => `${key} = ?`)
        .join(" AND ");
    const values = keys.map(key => filters[key]);
    const [rows] = await db.query(`SELECT * FROM users WHERE ${whereClause}`, values);
    return rows.length ? rows[0] : null;
};
//# sourceMappingURL=userRepo.js.map