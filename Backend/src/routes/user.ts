import express, { Request, Response, response } from "express";
import verifyToken, { verifyTokenAndAdmin, verifyTokenAndAuth } from "./verify";
import User, { IUser } from "../models/User";
import CryptoJS from "crypto-js";
import { send } from "process";
const router = express.Router();

interface req extends Request {
  user?: { id: string } | undefined;
}

const secretKey: string | null | undefined = process.env.secretKey;

router.put(
  "/update/:id",
  verifyTokenAndAuth,
  async (req: req, res: Response) => {
    const { username, password } = req.body;
    const id = req.params.id;

    if (!secretKey) {
      throw new Error("Secret Key cannot be found!");
    }

    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      secretKey
    ).toString();

    const updatedUser: any = await User.findByIdAndUpdate(
      id,
      { username, password: encryptedPassword },
      { new: true }
    );

    res.status(200).send({ updatedUser });
  }
);

router.delete(
  "/delete/:id",
  verifyTokenAndAuth,
  async (req: req, res: Response) => {
    const id = req.params.id;

    try {
      const deletedUser = await User.findByIdAndDelete(id);
      res.status(200).send({ deletedUser: deletedUser });
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.get(
  "/find/:id",
  verifyTokenAndAdmin,
  async (req: Request, res: Response) => {
    try {
      let id: string = req.params.id;
      let user = await User.findById(id, { password: 0 });
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.get("/", verifyTokenAndAdmin, async (req: Request, res: Response) => {
  try {
    const query = req.query.new;
    const users = query
      ? await User.find({}, { password: 0 }).sort({ id: -1 }).limit(5)
      : User.find({}, { password: 0 });

    res.status(200).json(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/stats", async (req: Request, res: Response) => {
  const date = new Date();
  let lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    let data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      {$group: {_id: "$month", total: {$sum: 1}}}
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
