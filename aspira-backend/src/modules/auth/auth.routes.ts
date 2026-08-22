import { Router } from "express";
import { refreshController, signupController } from "./auth.controller";
import { loginController } from "./auth.controller";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/refresh", refreshController)

export default router;