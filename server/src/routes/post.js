import { Router } from "express";
import { PostController } from "../controller/post.js";

const router = Router();

// For Creating Post
router.post("/", PostController.createPost);

// For Updating Post Like
router.patch("/", PostController.updateLikes);

// For Getting Posts
router.get("/", PostController.getAllPosts);

export default router;
