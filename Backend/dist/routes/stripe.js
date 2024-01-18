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
const stripe_1 = __importDefault(require("stripe"));
const router = express_1.default.Router();
const stripeKey = process.env.stripe;
if (!stripeKey) {
    throw new Error("stripe key cannot be found");
}
const stripe = new stripe_1.default(stripeKey);
router.post("/payment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokenId, amount } = req.body;
    try {
        const stripeResponse = yield stripe.charges.create({
            source: tokenId,
            amount: amount,
            currency: "INR",
        });
        res.status(200).json(stripeResponse);
    }
    catch (stripeError) {
        res.status(400).json(stripeError);
    }
}));
exports.default = router;
