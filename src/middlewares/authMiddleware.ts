import type { Request, Response, NextFunction } from "express";
import { validateAccessToken } from "../utils/jwtUtils.js";
import type { AuthUser } from "../types/express.js";

export const checkAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized access." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing." });
  }

  try {
    const decoded = validateAccessToken(token) as AuthUser;

    req.user = decoded; // now properly typed
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token." });
  }
};
