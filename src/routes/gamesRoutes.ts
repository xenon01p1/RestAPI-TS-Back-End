import express from "express";
import { checkAuthMiddleware } from "../middlewares/authMiddleware.js";
// import gameControllers from "../controllers/gameControllers.js";

const gameRoutes = express.Router();

// gameRoutes.get('/games', checkAuthMiddleware, gameControllers.getGames);
// gameRoutes.post('/games', checkAuthMiddleware, gameControllers.newGames);
// gameRoutes.patch('/games', checkAuthMiddleware, gameControllers.patchGames);
// gameRoutes.delete('/games', checkAuthMiddleware, gameControllers.deleteGames);

export default gameRoutes;
