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
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const products_1 = __importDefault(require("./routes/products"));
const cart_1 = __importDefault(require("./routes/cart"));
const order_1 = __importDefault(require("./routes/order"));
const Wishlist_1 = __importDefault(require("./routes/Wishlist"));
const razor_1 = __importDefault(require("./routes/razor"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const connectToMongoose = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoURL = process.env.MONGODB_URL;
        if (!mongoURL) {
            throw new Error("MongoDB connection URL is not defined in the environment variables.");
        }
        yield mongoose_1.default.connect(mongoURL);
        console.log("MongoDB connected successfully");
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
});
mongoose_1.default.connection.on("connected", () => {
    console.log("MongoDB connection established");
    app.use((0, cors_1.default)({ origin: '*' }));
    const uploadsPath = path_1.default.join(__dirname, '../uploads');
    app.use('/uploads', express_1.default.static(uploadsPath));
    app.use("/user", user_1.default);
    app.use("/auth", auth_1.default);
    app.use("/product", products_1.default);
    app.use("/cart", cart_1.default);
    app.use("/orders", order_1.default);
    app.use("/wish", Wishlist_1.default);
    app.use("/razor", razor_1.default);
    app.get("/home", (req, res) => {
        res.send("Hello, TypeScript with Express!");
    });
    app.listen(process.env.PORT || port, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT || port}`);
    });
});
connectToMongoose();
