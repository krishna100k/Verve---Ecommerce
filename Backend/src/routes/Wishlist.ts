import express from "express";
import WishList from "../models/Wishlist";
import { Request, Response } from "express";
import verifyToken from "./verify";

const router = express.Router();

router.post("/:userId", verifyToken, async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { productId, productImg, productTitle, productSize, productColor } =
    req.body;

  try {
    const wish = await WishList.findOne({ userId });

    if (!wish) {
      const wishList = new WishList({
        userId,
        products: [
          {
            productId,
            productImg,
            productTitle,
            productSize,
            productColor,
          },
        ],
      });
      await wishList.save();
      res.status(200).send(wishList);
    } else {
      const productExists = wish.products.find(
        (product) => product.productId === productId
      );

      if (productExists) {
        res.status(200).send("Product Already Exists");
      } else {
        const updatedWishList = await WishList.findOneAndUpdate(
          { userId },
          {
            $push: {
              products: {
                productId,
                productImg,
                productTitle,
                productSize,
                productColor,
              },
            },
          },
          { new: true }
        );

        res.status(200).send(updatedWishList);
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:userId", verifyToken, async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const wish = await WishList.findOne({ userId });
    res.status(200).send(wish);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
