import express, { Request, Response, response } from "express";
import verifyToken, { verifyTokenAndAdmin, verifyTokenAndAuth } from "./verify";
import Product, { Iproduct } from "../models/Product";
import multer from "multer";
import path from "path";

const router = express.Router();
const uploadsPath = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: uploadsPath,
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post(
  "/new",
  upload.single("image"),
  verifyTokenAndAdmin,
  async (req: Request, res: Response) => {
    try {
      const { title, desc, categories, size, color, price, inStock } = req.body;
      const img = req.file?.filename;

      const categoriesArr = categories.split(",");

      let newProduct: Iproduct = new Product({
        title,
        desc,
        img,
        categories: categoriesArr,
        size,
        color,
        price,
        inStock,
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
  upload.single("image"),
  verifyTokenAndAdmin,
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { title, desc, categories, size, color, price, inStock } = req.body;
    const categoriesArr = categories.split(",");
    const img = req.file?.filename;
    try {
      const updatedProduct: Iproduct | null = await Product.findByIdAndUpdate(
        id,
        {
          $set: {
            title,
            desc, 
            categories: categoriesArr,
            size,
            color,
            price,
            inStock,
            img: img && img
          },
        },
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
      product = await Product.find({ categories: { $in: [qcategory] } });
    } else {
      product = await Product.find({});
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

export default router;
