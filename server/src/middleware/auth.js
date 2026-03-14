import client from "../config/redis.js";

const getUserDetail = async (req, res) => {
  try {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      return null;
    }

    const user = await client.hGetAll(`user:${sessionId}`);

    return user;
  } catch (error) {
    throw error;
  }
};

export { getUserDetail };
