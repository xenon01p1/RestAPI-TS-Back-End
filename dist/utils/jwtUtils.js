import jwt from "jsonwebtoken";
const ACCESS_KEY = "FUCK YOU";
const REFRESH_KEY = "FUCK THIS";
export const createAccessToken = (userId, permissions) => {
    return jwt.sign({ id: userId, permissions }, ACCESS_KEY, { expiresIn: '5m' });
};
export const createRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, REFRESH_KEY, { expiresIn: '7d' });
};
export const validateAccessToken = (token) => {
    return jwt.verify(token, ACCESS_KEY);
};
export const validateRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_KEY);
};
//# sourceMappingURL=jwtUtils.js.map