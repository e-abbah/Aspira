"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.signupController = void 0;
const auth_schema_1 = require("./auth.schema");
const auth_service_1 = require("./auth.service");
const signupController = async (req, res, next) => {
    try {
        const parsed = auth_schema_1.signupSchema.safeParse(req.body);
        if (!parsed.success) {
            const errors = parsed.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));
            return res.status(400).json({
                message: "Validation failed",
                errors,
            });
        }
        const user = await (0, auth_service_1.signupUser)(parsed.data);
        return res.status(201).json({
            message: "Account created successfully",
            user,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.signupController = signupController;
const loginController = async (req, res, next) => {
    try {
        const parsed = auth_schema_1.loginSchema.safeParse(req.body);
        if (!parsed.success) {
            const errors = parsed.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));
            return res.status(400).json({
                message: "Validation failed",
                errors,
            });
        }
        const { accessToken, refreshToken, user } = await (0, auth_service_1.loginUser)(parsed.data);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            message: "Login successful",
            accessToken,
            user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.loginController = loginController;
