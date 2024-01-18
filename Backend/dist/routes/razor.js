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
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
const key_id = process.env.KEY_ID;
const key_secret = process.env.KEY_SECRET;
router.post("/order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!key_id || !key_secret) {
            return res.status(400).send("RazorPay key not found");
        }
        const razorPay = new razorpay_1.default({
            key_id: key_id,
            key_secret: key_secret,
        });
        const options = req.body;
        const order = yield razorPay.orders.create(options);
        if (!order) {
            res.status(500).send("Error!");
        }
        res.status(200).send(order);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post("/validate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!key_secret) {
        res.status(404).send("Secret Key Not Found");
    }
    const sha = crypto_1.default.createHmac("sha256", key_secret);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
        return res.status(400).json({ msg: "Transaction is not legit!" });
    }
    res.json({
        msg: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
    });
}));
exports.default = router;
