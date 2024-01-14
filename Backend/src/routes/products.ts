import express, { Request, Response, response } from "express";
import verifyToken, { verifyTokenAndAdmin, verifyTokenAndAuth } from "./verify";
import Product, { Iproduct } from "../models/Product";

const router = express.Router();

router.post(
  "/new",
  verifyTokenAndAdmin,
  async (req: Request, res: Response) => {
    try {
      const { title, desc, img, categories, size, color, price } = req.body;
      let newProduct: Iproduct = new Product({
        title,
        desc,
        img,
        categories,
        size,
        color,
        price,
      });
      let product = await newProduct.save();
      res
        .status(200)
        .json({ message: "Product Successfully Created", product });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.put(
  "/update/:id",
  verifyTokenAndAdmin,
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
      const updatedProduct: Iproduct | null = await Product.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.delete(
  "/delete/:id",
  verifyTokenAndAdmin,
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
      const deletedProduct: Iproduct | null = await Product.findByIdAndDelete(
        id
      );
      res
        .status(200)
        .json({ message: "Product Deleted Successfully ", deletedProduct });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.get("/find/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/find", async (req: Request, res: Response) => {
  let qnew = req.query.new;
  let qcategory = req.query.category;

  try {
    let product;

    if (qnew) {
      product = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    } else if (qcategory) {
      product = await Product.find({categories: {$in: [qcategory]}});
    } else {
      product = await Product.find({});
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

export default router;
