import db from "../connection.js";
import { authSchema } from "../schemas/authSchemas.js";
import { loginService, AuthError } from "../services/authServices.js";
const loginController = async (req, res) => {
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
        const tokens = await loginService(parsed.data.username, parsed.data.password);
        // 3️⃣ HTTP success response
        return res.status(200).json({
            status: "success",
            data: tokens
        });
    }
    catch (error) {
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
export { loginController };
// const registerController = async (req, res) => {
// }
// const refreshTokenController = async (req, res) => {
// }
export default {
    loginController,
    // registerController,
    // refreshTokenController
};
//# sourceMappingURL=authControllers.js.map