import { getGamesRepo, newGameRepo } from "../repositories/gamesRepo.js";
import type { Game } from "../schemas/gamesSchemas.js";

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