import client from "../config/redis.js";

const initalizeUserId = async () => {
  try {
    const isExist = await client.exists("user:id");
    if (!isExist) {
      await client.set("user:id", 0);
      console.log("Id Counter Initalized!");
    }
  } catch (error) {}
};

const addUserData = async (req, res) => {
  try {
    const { username } = req.body;
    const key = await client.incr("user:id");

    const user = await client.set(`Username:${key}`, username);

    res
      .status(201)
      .json({ success: true, msg: "User Created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: `Internal Server Error : ${error.message}`,
    });
  }
};

const getUsersData = async (req, res) => {
  try {
    const keys = await client.keys("Username:*");

    let users = [];
    for (let key of keys) {
      const username = await client.get(key);
      users.push({ [key]: username });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: `Internal Server Error : ${error.message}`,
    });
  }
};

export { addUserData, initalizeUserId, getUsersData };
