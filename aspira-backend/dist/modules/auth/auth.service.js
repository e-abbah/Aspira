"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.signupUser = void 0;
const auth_repository_1 = require("./auth.repository");
const hash_1 = require("../../utils/hash");
const AppError_1 = require("../../utils/AppError");
const token_1 = require("../../utils/token");
const signupUser = async (input) => {
    const existingUser = await (0, auth_repository_1.findUserByEmail)(input.email);
    if (existingUser) {
        throw new AppError_1.AppError("An account with this email already exists", 409);
    }
    const passwordHash = await (0, hash_1.hashPassword)(input.password);
    const user = await (0, auth_repository_1.createUser)({
        email: input.email,
        passwordHash,
        name: input.name,
    });
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
    };
};
exports.signupUser = signupUser;
const loginUser = async (data) => {
    const saltRounds = 10;
    const user = await (0, auth_repository_1.findUserByEmail)(data.email);
    if (!user) {
        throw new AppError_1.AppError("Invalid email or password", 401);
    }
    const isvalid = await (0, hash_1.comparePassword)(data.password, user.passwordHash);
    if (!isvalid) {
        throw new AppError_1.AppError("Invalid email or password", 401);
    }
    const accessToken = (0, token_1.generateAccessToken)({ userId: user.id });
    const refreshToken = (0, token_1.generateRefreshToken)({ userId: user.id });
    const tokenHash = await (0, hash_1.hashPassword)(refreshToken);
    const expiresAt = new Date(Date.now() + 2 * token_1.REFRESH_TOKEN_EXPIRY_MS);
    await (0, auth_repository_1.saveRefreshToken)({
        userId: user.id,
        tokenHash,
        expiresAt
    });
    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
    };
};
exports.loginUser = loginUser;
