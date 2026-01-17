import type { Response, Request, RequestHandler } from "express";
import { getGamesService, newGamesService, patchGameService, deleteGameService } from "../services/gamesService.js";
import type { GamesResponse, Game, GameForm } from "../schemas/gamesSchemas.js";
import { gameFormSchema } from "../schemas/gamesSchemas.js";

const getGames = async (
    res: Response<GamesResponse>
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

const newGames = async (
    req: Request<{}, GamesResponse, GameForm>,
    res: Response<GamesResponse>
): Promise<void> => {

    const parsed = gameFormSchema.safeParse(req.body);
    if (!parsed.success)  {
        res.status(400).json({
            status: "failed",
            message: "Invalid request"
        })
        return;
    }

    const { title, genre, rating } = parsed.data;

    try {
        const newGame = await newGamesService(title, genre, rating);

        res.status(400).json({
            status: "success",
            message: "Successfully added new game",
            data: {
                gameId: newGame
            }
        })
    } catch (err) {
        const message =
            err instanceof Error ? err.message : "Internal server error";

        res.status(500).json({
            status: "failed",
            message,
        });
    }
};

const patchGames: RequestHandler<
  { id: string },  // params
  GamesResponse,   // response
  GameForm         // body
> = async (req, res): Promise<void> => {
  const parsed = gameFormSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      status: "failed",
      message: "Invalid request",
    });
    return;
  }

  const id = Number(req.params.id);
  const { title, genre, rating } = parsed.data;

  try {
    const newGame = await patchGameService(id, { title, genre, rating });

    res.status(200).json({
      status: "success",
      message: "Successfully updated game",
      data: { gameId: newGame },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err instanceof Error ? err.message : "Internal server error",
    });
  }
};


const deleteGames: RequestHandler<
    {id: string},
    GamesResponse
> = async (req, res): Promise<void> => {

    const id = Number(req.params.id);

    try {
        await deleteGameService(id);
        res.status(200).json({
            status: "success",
            message: "Successfully delete data",
            data: { gameId: id }
        })

    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err instanceof Error ? err.message : "Internal server error",
        })
    }

};

export default {
    getGames,
    newGames,
    patchGames,
    deleteGames
};