import express, { Request, Response } from "express";
import User, { IUser } from "../models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import verifyToken from "./verify";
import Cart, { ICart } from "../models/Cart";

const router = express.Router();

interface CustomRequest extends Request {
  user?: any;
}

let secretKey: string | undefined = process.env.secretKey;

//REGISTRATION

router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  console.log(username);
  console.log(email);
  console.log(password);

  if (!secretKey) {
    throw new Error("Cant find secret key");
  }

  const newUser: IUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, secretKey),
  });

  try {
    const savedUser: IUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

//LOGIN

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user: IUser | null = await User.findOne<IUser>({ username });
    if (!user) {
      res.status(400).send("User not found");
      return;
    }

    if (!secretKey) {
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(user?.password, secretKey);
    const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin, username: user.username },
      secretKey
    );

    if (decryptedPassword !== password) {
      res.status(400).json("Username Or Password is wrong!");
    } else {
      res
        .status(200)
        .json({ message: "User Logged in Successfully", user, token });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/me", verifyToken, async (req: CustomRequest, res: Response) => {
  const user = req.user;
  try {
    res
      .status(200)
      .send({ message: "User Logged in Successfully", user: user });
  } catch (err) {
    console.log(err);
  }
});

export default router;
