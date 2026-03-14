import prisma from "../utils/prisma.js";
import { hashPassword } from "../utils/hash-password.js";
import { generateTokenAndSendCookie } from "../utils/cookie-generator.js";
import { getUserDetail } from "../middleware/auth.js";

const AuthController = {
  userSignup: async (req, res) => {
    try {
      const { name, email, password, mobile, city, country } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ success: false, msg: "Name, Email, Password is required!" });
      }

      const isAlready = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (isAlready) {
       
        return res
          .status(400)
          .json({ success: false, msg: "User already there, please login!" });
      }

      const hashedPassword = await hashPassword(password);


      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          mobile: parseInt(mobile),
          city,
          country,
        },
      });


      await generateTokenAndSendCookie(user, res);

      return res
        .status(201)
        .json({ success: true, msg: "User Signup Successfully!", user });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, msg: `Internal Server Error : ${error}` });
    }
  },

  getMe: async (req, res) => {
    try {
      const user = await getUserDetail(req, res);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, msg: "Please Login First!" });
      }

      return res
        .status(200)
        .json({ success: true, msg: "Welcome Back!", user });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: `Internal Server Error : ${error}` });
    }
  },
};

export { AuthController };
