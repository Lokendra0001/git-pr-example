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

function total(items) {
  let sum = 0;

  for (let i = 0; i < items.length; i++) {
    if (items[i].price) {
      sum = sum + items[i].price;
    }
  }

  return sum;
}

// Example usage
const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Mouse", price: 20 },
  { name: "Keyboard" },
];

total(cart);
app.use("/api", RedisRoute);

app.get("/", (req, res) => res.status(200).send("Hello From Server"));
app.listen(PORT, () => console.log("SERVER Started at PORT 3002"));
