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
const Wishlist_1 = __importDefault(require("../models/Wishlist"));
const verify_1 = __importDefault(require("./verify"));
const router = express_1.default.Router();
router.post("/:userId", verify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { productId, productImg, productTitle, productSize, productColor } = req.body;
    try {
        const wish = yield Wishlist_1.default.findOne({ userId });
        if (!wish) {
            const wishList = new Wishlist_1.default({
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
            yield wishList.save();
            res.status(200).send(wishList);
        }
        else {
            const productExists = wish.products.find((product) => product.productId === productId);
            if (productExists) {
                res.status(200).send("Product Already Exists");
            }
            else {
                const updatedWishList = yield Wishlist_1.default.findOneAndUpdate({ userId }, {
                    $push: {
                        products: {
                            productId,
                            productImg,
                            productTitle,
                            productSize,
                            productColor,
                        },
                    },
                }, { new: true });
                res.status(200).send(updatedWishList);
            }
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.get("/:userId", verify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const wish = yield Wishlist_1.default.findOne({ userId });
        res.status(200).send(wish);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
exports.default = router;
router.put("/remove/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const productId = req.body.productId;
    try {
        const wish = yield Wishlist_1.default.findOne({ userId });
        if (wish !== null) {
            const updatedProducts = (wish.products || []).filter((product) => {
                return product.productId !== productId;
            });
            wish.products = updatedProducts;
            yield wish.save();
            res.status(200).send({ wish, message: 'Removed Successfully' });
        }
        else {
            res.status(404).send("Wishlist not found");
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}));
