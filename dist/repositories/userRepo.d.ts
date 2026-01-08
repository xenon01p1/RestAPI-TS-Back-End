import type { User, FilterUser } from "../types/userTypes.js";
export declare const findUser: (filters: FilterUser) => Promise<User | null>;
export declare const insertUser: (username: string, password: string) => Promise<number>;
//# sourceMappingURL=userRepo.d.ts.map