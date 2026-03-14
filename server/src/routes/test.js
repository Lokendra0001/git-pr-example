import { Router } from "express";
import { addUserData, getUsersData } from "../controller/redis.js";
import { PubSubController } from "../controller/pubsub.js";

const router = Router();

router.get("/getUsers", getUsersData);
router.post("/createUser", addUserData);

router.get("/sendMessage", PubSubController.publishMessage);

export default router;
