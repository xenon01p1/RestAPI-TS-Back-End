import { access } from "node:fs";
import { z } from "zod"

export const authSchema = z.object({
    username: z.string(),
    password: z.string()
});

export const refreshTokenReqSchema = z.object({
    id: z.number(),
    refreshToken: z.string()
});

export const loginResSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("success"),
    data: z.object({
      accessToken: z.string(),
      refreshToken: z.string(),
    }),
  }),
  z.object({
    status: z.literal("failed"),
    message: z.string(),
  }),
]);

export const registerResSchema = z.discriminatedUnion("status", [
    z.object({
        status: z.literal("success"),
        message: z.string()
    }),
    z.object({
        status: z.literal("failed"),
        message: z.string()
    }),
])

export const refreshTokenSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("success"),
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
  z.object({
    status: z.literal("failed"),
    message: z.string()
  })
])

export type Auth = z.infer<typeof authSchema>;
export type LoginResponse = z.infer<typeof loginResSchema>;
export type RegisterResponse = z.infer<typeof registerResSchema>;
export type refreshTokenResponse = z.infer<typeof refreshTokenSchema>;
export type refreshTokenRequest = z.infer<typeof refreshTokenReqSchema>;
