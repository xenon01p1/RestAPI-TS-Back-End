import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../utils/jwtUtils.js";
import { findUser } from "../repositories/userRepo.js";
import { findPermissionsByUserId } from "../repositories/permissionsRepo.js";

export const loginService = async (username: string, password: string) => {
    const user = await findUser({ username });
    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const permissions = await findPermissionsByUserId(user.id);
    const accessToken = createAccessToken(user.id, permissions);
    const refreshToken = createRefreshToken(user.id);

    return {
        accessToken,
        refreshToken
    }
}

