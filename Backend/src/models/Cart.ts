import mongoose, {Schema, Document} from "mongoose";

export interface ICart extends Document{
    userId?: string,
    products?: [object]
}

const cartSchema = new mongoose.Schema<ICart>(
    {
        userId: {type: String, required: true, unique: true},
        products: [{
            productId: {type: String},
            quantity: {type: Number, default: 1}
        }]
    },
    { timestamps: true }
  );

  const Cart = mongoose.model<ICart>('Cart', cartSchema);

  export default Cart;