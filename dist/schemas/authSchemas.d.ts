import { z } from "zod";
export declare const authSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
declare const loginResSchema: z.ZodObject<{
    accessToken: z.ZodString;
    refreshToken: z.ZodString;
}, z.core.$strip>;
export type Auth = z.infer<typeof authSchema>;
export type LoginRes = z.infer<typeof loginResSchema>;
export {};
//# sourceMappingURL=authSchemas.d.ts.map