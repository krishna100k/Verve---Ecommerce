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
const Order_1 = __importDefault(require("../models/Order"));
const verify_1 = __importDefault(require("./verify"));
const router = express_1.default.Router();
router.post("/", verify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, name, address, mobile, products, total } = req.body;
    try {
        const newOrder = new Order_1.default({
            userId,
            name,
            address,
            mobile,
            products,
            total
        });
        if (newOrder) {
            yield newOrder.save();
            res.status(200).send(newOrder);
        }
    }
    catch (err) {
        res.status(500).send({ message: "Error", err });
    }
}));
router.get("/", verify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find({});
        res.status(200).send(orders);
    }
    catch (err) {
        res.status(402).send(err);
    }
}));
router.get("/:orderId", verify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.orderId;
    try {
        const order = yield Order_1.default.findOne({ _id });
        res.status(200).send(order);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
exports.default = router;
