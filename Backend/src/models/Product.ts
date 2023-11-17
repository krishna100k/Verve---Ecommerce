import mongoose, {Schema, Document} from "mongoose";

export interface Iproduct extends Document{
  title: string;
  desc: string;
  img: string;
  categories: string[];
  size: string;
  color: string;
  price: number;
}

const productSchema = new mongoose.Schema<Iproduct>(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: [String] },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model<Iproduct>("Product", productSchema);

export default Product;
