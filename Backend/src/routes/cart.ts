import express, { Request, Response, response } from "express";
import verifyToken, { verifyTokenAndAdmin, verifyTokenAndAuth } from "./verify";
import Cart, { ICart } from "../models/Cart";

const router = express.Router();

//CREATE
router.post("/", verifyToken, async (req: Request, res: Response) => {
  try {
    let newCart: ICart | null = new Cart(req.body);
    let savedCart: ICart | null = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(400).json(err);
  }
});

//UPDATE
router.put(
  "/update/:id",
  verifyTokenAndAuth,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      let updatedCart = await Cart.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET USER CART
  router.get("/find/:userId", verifyTokenAndAuth, async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // //GET ALL
  
  router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

export default router;
