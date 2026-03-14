import { Router } from "express";
import { AuthController } from "../controller/auth.js";

const router = Router();

router.post("/", AuthController.userSignup);

router.get("/", AuthController.getMe);

export default router;
