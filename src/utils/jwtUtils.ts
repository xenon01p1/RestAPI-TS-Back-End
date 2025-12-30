import jwt from "jsonwebtoken";
import type { GetPermissions } from "../types/permissionsTypes.js";

const ACCESS_KEY = "FUCK YOU";
const REFRESH_KEY = "FUCK THIS";

export const createAccessToken = (userId: number, permissions: GetPermissions[]) => {
    return jwt.sign({ id: userId, permissions }, ACCESS_KEY, { expiresIn: '5m' });
}

export const createRefreshToken = (userId: number) => {
    return jwt.sign({ id: userId }, REFRESH_KEY, { expiresIn: '7d' });
}

export const validateAccessToken = (token: string) => {
    return jwt.verify(token, ACCESS_KEY);
}

export const validateRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_KEY);
}
