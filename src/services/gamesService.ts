import { getGamesRepo, newGameRepo, patchGameRepo } from "../repositories/gamesRepo.js";
import type { Game } from "../schemas/gamesSchemas.js";
import type { PatchGameInput } from "../types/gameTypes.js";

export const getGamesService = async (): Promise<Game[]> => {
    const games = await getGamesRepo();
    return games;
}

export const newGamesService = async (
    title: string, 
    genre: string, 
    rating: number
): Promise<number> => {
    const result = await newGameRepo(title, genre, rating);
    if (result.affectedRows === 0) throw new Error("Failed to insert new game");

    return result.insertId;
}

export const patchGameService = async (
  id: number,
  data: PatchGameInput
): Promise<void> => {
  const result = await patchGameRepo(id, data);

  if (result.affectedRows === 0) {
    throw new Error("Game not found");
  }
};
