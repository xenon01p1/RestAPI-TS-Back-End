import type { Tokens } from "../types/authTypes.js";
export declare class AuthError extends Error {
    constructor(message?: string);
}
export declare const loginService: (username: string, password: string) => Promise<Tokens>;
//# sourceMappingURL=authServices.d.ts.map