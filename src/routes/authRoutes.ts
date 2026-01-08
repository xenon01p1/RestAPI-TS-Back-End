import express from "express";
import authControllers from "../controllers/authControllers.js";

const authRoutes = express.Router();

authRoutes.post('/login', authControllers.loginController);
authRoutes.post('/register', authControllers.registerController);
// authRoutes.post('/refresh-token', refreshTokenController);

export default authRoutes;