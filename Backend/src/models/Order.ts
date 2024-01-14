import mongoose, { Schema, Document } from "mongoose";

interface Product {
    productId: string;
    quantity: number;
}

interface IOrder extends Document{
    userId: string,
    name: string,
    address: string,
    mobile: string,
    products : Product[],
    total: number,
    status: string
}

const OrderSchema  = new mongoose.Schema<IOrder>(
  {
    userId: String,
    name: String,
    address: String,
    mobile: String,
    products: Array,
    total: Number,
    status:{type : String, required: true, default: "Pending"}
  },
  {
    timestamps: true,
  }
);


const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;