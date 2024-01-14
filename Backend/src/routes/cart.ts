import express, { Request, Response } from "express";
import verifyToken from "./verify";
import Cart, { ICart } from "../models/Cart";

const router = express.Router();

interface Product {
  productId?: string;
  quantity?: number;
}

interface userCart {
  save(): unknown;
  products: Product[];
}

router.post("/:userId", verifyToken, async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { productId, quantity } = req.body;

  try {
    const cart: ICart | null = await Cart.findOne({ userId });
    if (cart) {
      if (cart.products) {
        const existingProduct: Product | undefined = cart.products.find(
          (product: Product) => product.productId === productId
        );
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({
            productId,
            quantity,
          });
        }
      }
      let updatedCart = await cart.save();
      res.status(200).send(updatedCart);
    } else {
      if (userId !== undefined) {
        let newCart = new Cart({
          userId,
          products: [
            {
              productId,
              quantity,
            },
          ],
        });
        let updatedCart = await newCart.save();
        res.status(200).send(updatedCart);
      }
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:userId", verifyToken, async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const cart = await Cart.findOne({ userId });
    res.status(200).send(cart);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:userId", verifyToken, async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const productId = req.body.productId;

  try {
    const userCart: userCart | null = await Cart.findOne({ userId });
    if (userCart) {
      let updatedProducts = userCart.products?.filter((product) => {
        return product.productId !== productId;
      });

      userCart.products = updatedProducts;
      let filteredProducts = await userCart.save();
      res.status(200).send(filteredProducts);
    }
  } catch (err) {
    res.status(500).send(err)
  }
});

router.delete("/:userId", verifyToken, async (req: Request, res: Response) => {
  const userId : string | undefined = req.params.userId; 
  try {
    const deleteCart = await Cart.findOneAndDelete({userId});
    res.status(200).send(deleteCart);
  } catch (err) {
    res.status(400).send(err);
  }
});


//CREATE
// router.post("/", verifyToken, async (req: Request, res: Response) => {
//   const userId = req.body.userId;
//   const productToAdd = req.body.products;

//   try {
//     const cart: ICart | null | undefined = await Cart.findOne({
//       userId: userId,
//     });

//     if (cart) {
//       if (cart.products) {
//         cart?.products.push(productToAdd);

//         const updatedCart: ICart | null = await cart.save();

//         res.status(200).json(updatedCart);
//       }
//     } else {
//       const newCart: ICart | null = new Cart({
//         userId: userId,
//         products: [productToAdd],
//       });

//       const savedCart: ICart | null = await newCart.save();

//       res.status(200).json(savedCart);
//     }
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// //UPDATE
// router.put(
//   "/update/:id",
//   verifyTokenAndAuth,
//   async (req: Request, res: Response) => {
//     const id = req.params.id;
//     try {
//       let updatedCart = await Cart.findByIdAndUpdate(
//         id,
//         { $set: req.body },
//         { new: true }
//       );
//       res.status(200).json(updatedCart);
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   }
// );

// router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
//   try {
//     await Cart.findByIdAndDelete(req.params.id);
//     res.status(200).json("Cart has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET USER CART
// router.get("/find/:userId", verifyTokenAndAuth, async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.params.userId });
//     res.status(200).json(cart);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // //GET ALL

// router.get("/", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const carts = await Cart.find();
//     res.status(200).json(carts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

export default router;
