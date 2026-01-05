import { z } from "zod";
export const authSchema = z.object({
    username: z.string(),
    password: z.string()
});
const loginResSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string()
});
//# sourceMappingURL=authSchemas.js.map