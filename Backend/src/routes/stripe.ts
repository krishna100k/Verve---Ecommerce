import express, { Request, Response } from "express";
import Stripe from "stripe";

const router = express.Router();
const stripeKey: string | undefined = process.env.stripe;

if (!stripeKey) {
  throw new Error("stripe key cannot be found");
}

const stripe = new Stripe(stripeKey);

router.post("/payment", async (req: Request, res: Response) => {
  const { tokenId, amount } = req.body;

  try {
    const stripeResponse = await stripe.charges.create({
      source: tokenId,
      amount: amount,
      currency: "INR",
    });

    res.status(200).json(stripeResponse);
  } catch (stripeError) {
    res.status(400).json(stripeError);
  }
});

export default router
