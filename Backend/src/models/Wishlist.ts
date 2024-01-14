import mongoose, { Schema, Document } from "mongoose";

interface Product{
    productId: string,
    productImg: string,
    productTitle: string,
    productSize: string,
    productColor: string,
}

interface WishList extends Document{
userId: string;
products: Product[];
}

const WishlistSchema: Schema<WishList> = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  products: [
    {
      productId: String,
      productImg: String,
      productTitle: String,
      productSize: String,
      productColor: String,
    },
    { timestamps: true },
  ],
});

const WishList = mongoose.model<WishList>('WishList', WishlistSchema);
export default WishList;
