import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET as string;

const ACCESS_TOKEN_EXPIRY = "10m";
const REFRESH_TOKEN_EXPIRY = "2d";

export const REFRESH_TOKEN_EXPIRY_MS = 2 * 24 * 60 * 60 * 1000;
export interface TokenPayload{
    userId: string
}

export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY
    });
}

export const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY
    });
}

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
};