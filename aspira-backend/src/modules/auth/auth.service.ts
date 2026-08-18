import { findUserByEmail, createUser } from "./auth.repository";
import { hashPassword } from "../../utils/hash";
import { AppError } from "../../utils/AppError";
import { SignupInput } from "./auth.schema";

export const signupUser = async (input: SignupInput) => {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw new AppError("An account with this email already exists", 409);
  }

  const passwordHash = await hashPassword(input.password);

  const user = await createUser({
    email: input.email,
    passwordHash,
    name: input.name,
  });

  // Never return the password hash to the client
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };
};