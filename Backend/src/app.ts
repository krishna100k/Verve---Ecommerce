import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import userRoute from "./routes/user";
import authRoute from "./routes/auth";
import productRoute from "./routes/products";
import cartRoute from "./routes/cart";
import orderRoute from "./routes/order";
import wishlistRoute from "./routes/Wishlist"
import razorRoute from "./routes/razor"
import path from "path";


const app: any = express();
const port: number = 3000;

// MongoDB connection
const connectToMongoose = async () => {
  try {
    const mongoURL = process.env.MONGODB_URL;
    if (!mongoURL) {
      throw new Error(
        "MongoDB connection URL is not defined in the environment variables."
      );
    }
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log(err);
  }
};

connectToMongoose();

app.use(cors({
  origin: '*'
}));

const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));


app.use(express.json({limit:'10mb'}));
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/orders", orderRoute);
app.use("/wish", wishlistRoute );
app.use("/razor", razorRoute );


app.get("/home", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});