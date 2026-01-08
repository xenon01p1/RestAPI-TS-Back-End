import type { Request, Response } from "express";
import type { Auth, LoginResponse, RegisterResponse } from "../schemas/authSchemas.js";
declare const _default: {
    loginController: (req: Request<{}, LoginResponse, Auth>, res: Response<LoginResponse>) => Promise<Response<{
        status: "success";
        data: {
            accessToken: string;
            refreshToken: string;
        };
    } | {
        status: "failed";
        message: string;
    }, Record<string, any>>>;
    registerController: (req: Request<{}, RegisterResponse, Auth>, res: Response<RegisterResponse>) => Promise<Response<{
        status: "success";
        message: string;
    } | {
        status: "failed";
        message: string;
    }, Record<string, any>>>;
};
export default _default;
//# sourceMappingURL=authControllers.d.ts.map