import jwt from "jsonwebtoken";
import type { GetPermissions } from "../types/permissionsTypes.js";
export declare const createAccessToken: (userId: number, permissions: GetPermissions[]) => string;
export declare const createRefreshToken: (userId: number) => string;
export declare const validateAccessToken: (token: string) => string | jwt.JwtPayload;
export declare const validateRefreshToken: (token: string) => string | jwt.JwtPayload;
//# sourceMappingURL=jwtUtils.d.ts.map