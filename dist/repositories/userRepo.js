import db from "../connection.js";
const ALLOWED_COLUMNS = [
    "id",
    "username",
    "password",
    "refresh_token"
];
const findUser = async (filters = {}) => {
    const keys = Object.keys(filters).filter(key => {
        ALLOWED_COLUMNS.includes(key);
    });
    if (keys.length === 0) {
        throw new Error("No valid filter provided");
    }
};
//# sourceMappingURL=userRepo.js.map