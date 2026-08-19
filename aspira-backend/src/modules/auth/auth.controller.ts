import { Request, Response, NextFunction } from "express";
import { signupSchema } from "./auth.schema";
import { signupUser } from "./auth.service";

export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsed = signupSchema.safeParse(req.body);

        // if (!parsed.success) {
        //   return res.status(400).json({
        //     message: "Validation failed",
        //     errors: parsed.error.issues,
        //   });
        // }
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