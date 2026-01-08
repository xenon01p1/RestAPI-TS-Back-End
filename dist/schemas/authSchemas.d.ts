import { z } from "zod";
export declare const authSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const loginResSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    status: z.ZodLiteral<"success">;
    data: z.ZodObject<{
        accessToken: z.ZodString;
        refreshToken: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    status: z.ZodLiteral<"failed">;
    message: z.ZodString;
}, z.core.$strip>], "status">;
export declare const registerResSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    status: z.ZodLiteral<"success">;
    message: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    status: z.ZodLiteral<"failed">;
    message: z.ZodString;
}, z.core.$strip>], "status">;
export type Auth = z.infer<typeof authSchema>;
export type LoginResponse = z.infer<typeof loginResSchema>;
export type RegisterResponse = z.infer<typeof registerResSchema>;
//# sourceMappingURL=authSchemas.d.ts.map