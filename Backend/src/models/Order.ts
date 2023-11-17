import mongoose, {Schema, Document} from "mongoose";

export interface IOrder extends Document{
    userId: string,
    products: [object],
    amount: number,
    address: string,
    status: string
}

const orderSchema = new mongoose.Schema<IOrder>(
    {
        userId: {type: String, required: true, unique: true},
        products: [{
            productId: {type: String},
            quantity: {type: Number, default: 1}
        }],
        amount: {type: Number, require: true},
        address: {type: String, required: true},
        status: {type: String, default: "pending"}

    },
    { timestamps: true }
  );

  const Order = mongoose.model<IOrder>('Order', orderSchema)

  export default Order;
