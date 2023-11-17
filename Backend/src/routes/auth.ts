import express, { Request, Response } from "express";
import User, { IUser } from "../models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = express.Router();


let secretKey: string | undefined = process.env.secretKey;

//REGISTRATION

router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

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
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user: IUser | null = await User.findOne<IUser>({ username });
    if (!user) {
      res.status(400).send("User not found");
      throw new Error("User Not Found");
    }

    if (!secretKey) {
      throw new Error("Cant find secret key");
    }

    const hashedPassword = CryptoJS.AES.decrypt(user?.password, secretKey);
    const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, secretKey);

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



export default router;
