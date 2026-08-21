"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRefreshToken = exports.createUser = exports.findUserByEmail = void 0;
const db_1 = __importDefault(require("../../config/db"));
const findUserByEmail = async (email) => {
    return db_1.default.user.findUnique({ where: { email } });
};
exports.findUserByEmail = findUserByEmail;
const createUser = async (data) => {
    return db_1.default.user.create({ data });
};
exports.createUser = createUser;
const saveRefreshToken = async (data) => {
    return db_1.default.refreshToken.create({ data });
};
exports.saveRefreshToken = saveRefreshToken;
