import { Router } from "express";
import authRouter from "./auth.js";
import testRouter from "./test.js";
import postRouter from "./post.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/test", testRouter);
router.use("/post", postRouter);

export default router;
