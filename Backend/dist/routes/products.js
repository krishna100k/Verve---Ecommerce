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
const Product_1 = __importDefault(require("../models/Product"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const uploadsPath = path_1.default.join(__dirname, "../uploads");
const storage = multer_1.default.diskStorage({
    destination: uploadsPath,
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage: storage });
router.post("/new", upload.single("image"), verify_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, desc, categories, size, color, price, inStock } = req.body;
        const img = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        const categoriesArr = categories.split(",");
        let newProduct = new Product_1.default({
            title,
            desc,
            img,
            categories: categoriesArr,
            size,
            color,
            price,
            inStock,
        });
        let product = yield newProduct.save();
        res
            .status(200)
            .json({ message: "Product Successfully Created", product });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.put("/update/:id", upload.single("image"), verify_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = req.params.id;
    const { title, desc, categories, size, color, price, inStock } = req.body;
    const categoriesArr = categories.split(",");
    const img = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
    try {
        const updatedProduct = yield Product_1.default.findByIdAndUpdate(id, {
            $set: {
                title,
                desc,
                categories: categoriesArr,
                size,
                color,
                price,
                inStock,
                img: img && img
            },
        }, { new: true });
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.delete("/delete/:id", verify_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedProduct = yield Product_1.default.findByIdAndDelete(id);
        res
            .status(200)
            .json({ message: "Product Deleted Successfully ", deletedProduct });
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
router.get("/find/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const product = yield Product_1.default.findById(id);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
router.get("/find", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let qnew = req.query.new;
    let qcategory = req.query.category;
    try {
        let product;
        if (qnew) {
            product = yield Product_1.default.find({}).sort({ createdAt: -1 }).limit(5);
        }
        else if (qcategory) {
            product = yield Product_1.default.find({ categories: { $in: [qcategory] } });
        }
        else {
            product = yield Product_1.default.find({});
        }
        res.status(200).json(product);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
}));
exports.default = router;
