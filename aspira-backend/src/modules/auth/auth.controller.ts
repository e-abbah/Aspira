import { Request, Response, NextFunction } from "express";
import { signupSchema, loginSchema } from "./auth.schema";
import { loginUser, signupUser } from "./auth.service";
import { AppError } from "@/utils/AppError";
import { email } from "zod";
import { hashPassword } from "@/utils/hash";

export const signupController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = signupSchema.safeParse(req.body);

    
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

        const user = await signupUser(parsed.data);

        return res.status(201).json({
            message: "Account created successfully",
            user,
        });
    } catch (err) {
        next(err);
    }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Validate
    const parsed = loginSchema.safeParse(req.body);

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

    // 2. Call the service
    const { accessToken, refreshToken, user } = await loginUser(parsed.data);

    // steps 3 and 4 go here next

  } catch (error) {
    next(error);
  }
};