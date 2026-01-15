import type { Response, Request } from "express";
import { getGamesService } from "../services/gamesService.js";
import type { GetGamesResponse, Game } from "../schemas/gamesSchemas.js";

const getGames = async (
    res: Response<GetGamesResponse>
): Promise<void> => {

    try {
        const games: Game[] = await getGamesService();
        res
            .status(200)
            .json({
                status: "success",
                message: "Successfully get games",
                data: games
            });

    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: "Internal server error"
        });
    }

};

// const newGames = async (
//     req: Request,
//     res: Response
// ) => {

// };

// const patchGames = async (
//     req: Request,
//     res: Response
// ) => {

// };

// const deleteGames = async (
//     req: Request,
//     res: Response
// ) => {

// };

export default {
    getGames,
    // newGames,
    // patchGames,
    // deleteGames
};