import express, { Request, Response } from "express";
import Razorpay from "razorpay";
import crypto from "crypto"

const router = express.Router();

const key_id = process.env.KEY_ID;
const key_secret : any = process.env.KEY_SECRET;

router.post("/order", async (req: Request, res: Response) => {
  try {
    if (!key_id || !key_secret) {
      return res.status(400).send("RazorPay key not found");
    }

    const razorPay = new Razorpay({
      key_id: key_id,
      key_secret: key_secret,
    });

    const options = req.body;

    const order = await razorPay.orders.create(options);

    if (!order) {
      res.status(500).send("Error!");
    }

    res.status(200).send(order);
  } catch (err) {
    res.status(400).send(err);
  }
});


router.post("/validate", async (req : Request, res : Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

    if(!key_secret){
      res.status(404).send("Secret Key Not Found")
    }

  const sha = crypto.createHmac("sha256", key_secret);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

export default router;
