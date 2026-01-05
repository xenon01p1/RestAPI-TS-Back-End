import type { Request, Response } from "express";
import type { Auth } from "../schemas/authSchemas.js";
type LoginResponse = {
    status: "success";
    data: {
        accessToken: string;
        refreshToken: string;
    };
} | {
    status: "failed";
    message: string;
};
declare const loginController: (req: Request<{}, LoginResponse, Auth>, res: Response<LoginResponse>) => Promise<Response<LoginResponse, Record<string, any>>>;
export { loginController };
declare const _default: {
    loginController: (req: Request<{}, LoginResponse, Auth>, res: Response<LoginResponse>) => Promise<Response<LoginResponse, Record<string, any>>>;
};
export default _default;
//# sourceMappingURL=authControllers.d.ts.map