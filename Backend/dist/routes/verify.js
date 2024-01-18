"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAndAdmin = exports.verifyTokenAndAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        const secretKey = process.env.secretKey;
        if (!secretKey) {
            return;
        }
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }
        const tokenArray = authHeader.split(" ");
        if (!tokenArray || tokenArray.length < 2) {
            return res
                .status(401)
                .json({ error: "Token is missing from Authorization header" });
        }
        const token = tokenArray[1];
        jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(401).json({ message: "Token is not valid", err });
            }
            else {
                req.user = user;
                next();
            }
        });
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) !== req.params.id) {
            res.status(401).send("You are not allowed to do this action!");
        }
        else {
            next();
        }
    });
};
exports.verifyTokenAndAuth = verifyTokenAndAuth;
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(400).send("You are not an admin");
        }
    });
};
exports.verifyTokenAndAdmin = verifyTokenAndAdmin;
exports.default = verifyToken;
