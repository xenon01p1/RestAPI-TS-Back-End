import type { Request, Response } from "express";
import type { Auth, LoginResponse, RegisterResponse } from "../schemas/authSchemas.js";
import { authSchema } from "../schemas/authSchemas.js";
import { loginService, AuthError, registerService } from "../services/authServices.js";

const loginController = async (
  req: Request<{}, LoginResponse, Auth>,
  res: Response<LoginResponse>
) => {
  // 1️⃣ runtime validation
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid request body"
    });
  }

  try {
    // 2️⃣ call service
    const tokens = await loginService(
      parsed.data.username,
      parsed.data.password
    );

    // 3️⃣ HTTP success response
    return res.status(200).json({
      status: "success",
      data: tokens
    });

  } catch (error) {
    // 4️⃣ map domain error → HTTP error
    if (error instanceof AuthError) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid credentials"
      });
    }

    // 5️⃣ unexpected error
    return res.status(500).json({
      status: "failed",
      message: "Internal server error"
    });
  }
};

const registerController = async (
  req: Request<{}, RegisterResponse, Auth>, 
  res: Response<RegisterResponse>
) => {

  const parsed = authSchema.safeParse(req.body);
  if(!parsed.success) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid request body"
    })
  }

  const { username, password } = parsed.data;

  try {
    await registerService(username, password);

    return res.status(201).json({
      status: "success",
      message: "Register successful"
    })

  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Internal server error"
    })
  }
}

// const refreshTokenController = async (
//   req = Request<{}, RegisterResponse, Auth>, 
//   res = Response<RegisterResponse>
// ) => {

// }

export default {
  loginController,
  registerController,
  // refreshTokenController
}