import bcrypt from "bcrypt";
import type { Tokens } from "../types/authTypes.js";
import { createAccessToken, createRefreshToken } from "../utils/jwtUtils.js";
import { findUser, insertUser, updateUser } from "../repositories/userRepo.js";
import { findPermissionsByUserId } from "../repositories/permissionsRepo.js";
import { permission } from "node:process";
import { create } from "node:domain";

export class AuthError extends Error {
  constructor(message = "INVALID_CREDENTIALS") {
    super(message);
    this.name = "AuthError";
  }
}

export class UserError extends Error {
  constructor(message = "INVALID_USER") {
    super(message);
    this.name = "UserError";
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

export const refreshTokenService = async (id: number, refreshToken: string): Promise<Tokens> => {
  const user = await findUser({ refreshToken });
  if (!user) throw new UserError();

  const permissions = await findPermissionsByUserId(id);
  const createNewAccessToken = createAccessToken(id, permissions);
  const createNewRefreshToken = createRefreshToken(id);

  await updateUser ({refreshToken}, {id});

  return {
    accessToken: createNewAccessToken,
    refreshToken: createNewRefreshToken
  }
}


