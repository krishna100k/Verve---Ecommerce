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
const verify_1 = require("./verify");
const User_1 = __importDefault(require("../models/User"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const router = express_1.default.Router();
const secretKey = process.env.secretKey;
router.put("/update/:id", verify_1.verifyTokenAndAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const id = req.params.id;
    if (!secretKey) {
        throw new Error("Secret Key cannot be found!");
    }
    const encryptedPassword = crypto_js_1.default.AES.encrypt(password, secretKey).toString();
    const updatedUser = yield User_1.default.findByIdAndUpdate(id, { username, password: encryptedPassword }, { new: true });
    res.status(200).send({ updatedUser });
}));
router.delete("/delete/:id", verify_1.verifyTokenAndAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedUser = yield User_1.default.findByIdAndDelete(id);
        res.status(200).send({ deletedUser: deletedUser });
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.get("/find/:id", verify_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        let user = yield User_1.default.findById(id, { password: 0 });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
router.get("/", verify_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.new;
        const users = query
            ? yield User_1.default.find({}, { password: 0 }).sort({ id: -1 }).limit(5)
            : User_1.default.find({}, { password: 0 });
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.get("/stats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    let lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        let data = yield User_1.default.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: "$createdAt" } } },
            { $group: { _id: "$month", total: { $sum: 1 } } }
        ]);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
