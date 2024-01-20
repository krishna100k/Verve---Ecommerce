import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import userRoute from "./routes/user";
import authRoute from "./routes/auth";
import productRoute from "./routes/products";
import cartRoute from "./routes/cart";
import orderRoute from "./routes/order";
import wishlistRoute from "./routes/Wishlist"
import razorRoute from "./routes/razor"
import path from "path";
import bodyParser from "body-parser";

const app: any = express();
const port: number = 3000;

dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


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
    process.exit(1); 
  }
};


mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established");
  

  app.use(cors({ origin: '*' }));
  
  const uploadsPath = path.join(__dirname, '../uploads');
  app.use('/uploads', express.static(uploadsPath));

  app.use("/user", userRoute);
  app.use("/auth", authRoute);
  app.use("/product", productRoute);
  app.use("/cart", cartRoute);
  app.use("/orders", orderRoute);
  app.use("/wish", wishlistRoute);
  app.use("/razor", razorRoute);

  app.get("/home", (req: Request, res: Response) => {
    res.send("Hello, TypeScript with Express!");
  });

  app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || port}`);
  });
});


connectToMongoose();
