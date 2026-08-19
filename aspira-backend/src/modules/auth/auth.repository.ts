import prisma from "../../config/db";

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (data: {
  email: string;
  passwordHash: string;
  name: string;
}) => {
  return prisma.user.create({ data });
};

export const saveRefreshToken = async (data: {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}) => {
  return prisma.refreshToken.create({ data });
};