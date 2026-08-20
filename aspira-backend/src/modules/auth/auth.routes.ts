import { Router } from "express";
import { signupController } from "./auth.controller";
import { loginController } from "./auth.controller";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController)

export default router;