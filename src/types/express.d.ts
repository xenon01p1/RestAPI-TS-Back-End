import type { JwtPayload } from "jsonwebtoken";

export interface AuthUser {
  id: number;
  permissions: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
