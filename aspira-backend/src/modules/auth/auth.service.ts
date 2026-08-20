import { findUserByEmail, createUser } from "./auth.repository";
import { comparePassword, hashPassword } from "../../utils/hash";
import { AppError } from "../../utils/AppError";
import { SignupInput } from "./auth.schema";
import { generateAccessToken} from "@/utils/token";
import { generateRefreshToken } from "@/utils/token";



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
  const isvalid =await comparePassword(user.passwordHash, data.password);
  if(!isvalid){
    throw new AppError("Invalid email or password", 401);
  }

  //generate token
  const accessToken = generateAccessToken({userId: user.id});
  const refreshToken = generateRefreshToken({ userId: user.id });

  const passwordHash = await hashPassword(refreshToken);




}
  

