"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verify_1 = __importDefault(require("./verify"));
const Cart_1 = __importDefault(require("../models/Cart"));
const router = express_1.default.Router();
router.post("/:userId", verify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;
    try {
        const cart = yield Cart_1.default.findOne({ userId });
        if (cart) {
            if (cart.products) {
                const existingProduct = cart.products.find((product) => product.productId === productId);
                if (existingProduct) {
                    existingProduct.quantity += quantity;
                }
                else {
                    cart.products.push({
                        productId,
                        quantity,
                    });
                }
            }
            let updatedCart = yield cart.save();
            res.status(200).send(updatedCart);
        }
        else {
            if (userId !== undefined) {
                let newCart = new Cart_1.default({
                    userId,
                    products: [
                        {
                            productId,
                            quantity,
                        },
                    ],
                });
                let updatedCart = yield newCart.save();
                res.status(200).send(updatedCart);
            }
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.get("/:userId", verify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const cart = yield Cart_1.default.findOne({ userId });
        res.status(200).send(cart);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.put("/:userId", verify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.params.userId;
    const productId = req.body.productId;
    try {
        const userCart = yield Cart_1.default.findOne({ userId });
        if (userCart) {
            let updatedProducts = (_a = userCart.products) === null || _a === void 0 ? void 0 : _a.filter((product) => {
                return product.productId !== productId;
            });
            userCart.products = updatedProducts;
            let filteredProducts = yield userCart.save();
            res.status(200).send(filteredProducts);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.delete("/:userId", verify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const deleteCart = yield Cart_1.default.findOneAndDelete({ userId });
        res.status(200).send(deleteCart);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
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
exports.default = router;
