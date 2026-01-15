import { getGamesRepo } from "../repositories/gamesRepo.js";

export const getGamesService = async () => {
    const games = await getGamesRepo();
    return games;
}