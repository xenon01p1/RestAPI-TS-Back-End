import bcrypt from "bcrypt";
import type { Tokens } from "../types/authTypes.js";
import { createAccessToken, createRefreshToken } from "../utils/jwtUtils.js";
import { findUser, insertUser } from "../repositories/userRepo.js";
import { findPermissionsByUserId } from "../repositories/permissionsRepo.js";

export class AuthError extends Error {
  constructor(message = "INVALID_CREDENTIALS") {
    super(message);
    this.name = "AuthError";
  }
}

export const loginService = async (
  username: string,
  password: string
): Promise<Tokens> => {
  const user = await findUser({ username });
  if (!user) {
    throw new AuthError();
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AuthError();
  }

  const permissions = await findPermissionsByUserId(user.id);
  const accessToken = createAccessToken(user.id, permissions);
  const refreshToken = createRefreshToken(user.id);

  return { accessToken, refreshToken };
};

export const registerService = async (username: string, password: string): Promise<void> => {
  const hashedPass = await bcrypt.hash(password, 12);
  await insertUser(username, hashedPass);
};


