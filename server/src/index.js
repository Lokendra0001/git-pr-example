import {} from "../instrument.js";
import * as Sentry from "@sentry/node";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initalizeUserId } from "../src/controller/redis.js";
import { initSubscriber } from "./controller/pubsub.js";
import RedisRoute from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true, // if you want cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // optional
    allowedHeaders: ["Content-Type", "Authorization"], // optional
  }),
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const PORT = 3002;

initalizeUserId();
initSubscriber();

setTimeout(() => {
  try {
    foo();
  } catch (error) {
    console.log("Sentry Msg Forwaded");
    // Sentry.captureException(error);
  }
}, 1000);
app.use("/api", RedisRoute);

app.get("/", (req, res) => res.status(200).send("Hello From Server"));
app.listen(PORT, () => console.log("SERVER Started at PORT 3002"));
