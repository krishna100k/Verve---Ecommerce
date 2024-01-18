"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    userId: String,
    name: String,
    address: String,
    mobile: String,
    products: Array,
    total: Number,
    status: { type: String, required: true, default: "Pending" }
}, {
    timestamps: true,
});
const Order = mongoose_1.default.model("Order", OrderSchema);
exports.default = Order;
