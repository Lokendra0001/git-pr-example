import jwt from "jsonwebtoken";
import client from "../config/redis.js";

const generateTokenAndSendCookie = async (user, res) => {
  try {
    const userPayload = {
      name: user.name,
      email: user.email,
    };
   
    const token = jwt.sign(userPayload, process.env.JWT_SECRET);

    // Redis Session Id Generation and Storing Data
    const sessionId = Math.random().toString(36).substring(2, 15);
    await client.hSet(`User:${sessionId}`, {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      city: user.city,
      country: user.country,
    });

    res.cookie("accesstoken", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      sameSite: "lax",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { generateTokenAndSendCookie };
