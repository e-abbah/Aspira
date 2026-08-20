import { findUserByEmail, createUser, saveRefreshToken } from "./auth.repository";
import { comparePassword, hashPassword } from "../../utils/hash";
import { AppError } from "../../utils/AppError";
import { SignupInput } from "./auth.schema";
import { generateAccessToken, generateRefreshToken, REFRESH_TOKEN_EXPIRY_MS} from "../../utils/token";
// import { generateRefreshToken } from "@/utils/token";
// import { REFRESH_TOKEN_EXPIRY_MS } from "@/utils/token";


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

export const loginUser = async (data: {email: string; password: string}) => {
  const saltRounds = 10;
  const user = await findUserByEmail(data.email);
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  
  }
  const isvalid =await comparePassword(data.password, user.passwordHash);
  if(!isvalid){
    throw new AppError("Invalid email or password", 401);
  }

  //generate token
  const accessToken = generateAccessToken({userId: user.id});
  const refreshToken = generateRefreshToken({ userId: user.id });

  const tokenHash = await hashPassword(refreshToken);
  const expiresAt = new Date(Date.now() + 2 * REFRESH_TOKEN_EXPIRY_MS)

  await saveRefreshToken({
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

}
  

