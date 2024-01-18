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
const User_1 = __importDefault(require("../models/User"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verify_1 = __importDefault(require("./verify"));
const router = express_1.default.Router();
let secretKey = process.env.secretKey;
//REGISTRATION
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    if (!secretKey) {
        throw new Error("Cant find secret key");
    }
    const newUser = new User_1.default({
        username,
        email,
        password: crypto_js_1.default.AES.encrypt(password, secretKey),
    });
    try {
        const savedUser = yield newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
//LOGIN
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            res.status(400).send("User not found");
            return;
        }
        if (!secretKey) {
            return;
        }
        const hashedPassword = crypto_js_1.default.AES.decrypt(user === null || user === void 0 ? void 0 : user.password, secretKey);
        const decryptedPassword = hashedPassword.toString(crypto_js_1.default.enc.Utf8);
        const token = jsonwebtoken_1.default.sign({ _id: user._id, isAdmin: user.isAdmin, username: user.username }, secretKey);
        if (decryptedPassword !== password) {
            res.status(400).json("Username Or Password is wrong!");
        }
        else {
            res
                .status(200)
                .json({ message: "User Logged in Successfully", user, token });
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
router.get("/me", verify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        res
            .status(200)
            .send({ message: "User Logged in Successfully", user: user });
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
