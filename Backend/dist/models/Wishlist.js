"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const WishlistSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, unique: true },
    products: [
        {
            productId: String,
            productImg: String,
            productTitle: String,
            productSize: String,
            productColor: String,
        },
        { timestamps: true },
    ],
});
const WishList = mongoose_1.default.model('WishList', WishlistSchema);
exports.default = WishList;
