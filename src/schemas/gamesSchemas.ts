import { z } from "zod";

export const gameSchema = z.object({
  id: z.number(),
  title: z.string(),
  genre: z.string(),
  rating: z.number(),
});

export const gameFormSchema = gameSchema.omit({
  id: true,
});

export const gamesResponseSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("success"),
    message: z.string(),
    data: z.any(),
  }),
  z.object({
    status: z.literal("failed"),
    message: z.string(),
  }),
]);

export type Game = z.infer<typeof gameSchema>;
export type GameForm = z.infer<typeof gameFormSchema>;
export type GamesResponse = z.infer<typeof gamesResponseSchema>;
