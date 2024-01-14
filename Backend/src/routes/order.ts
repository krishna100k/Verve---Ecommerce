import express, {Request, Response} from "express";
import Order from "../models/Order";
import verifyToken from "./verify";

const router = express.Router();

router.post("/", verifyToken ,async (req: Request, res: Response) => {
    const {userId, name, address, mobile, products, total} = req.body;

    try{
        const newOrder = new Order({
            userId,
            name,
            address,
            mobile,
            products,
            total
        })
        if(newOrder){
            await newOrder.save();
            res.status(200).send(newOrder)
        }
    }catch(err){
        res.status(500).send({message : "Error",err});
    }

})

router.get("/", verifyToken , async (req:Request, res:Response) => {
    try{
        const orders = await Order.find({});
        res.status(200).send(orders);
    }catch(err){
        res.status(402).send(err)
    }
})


router.get("/:orderId", verifyToken ,async (req:Request, res:Response) => {

    const _id = req.params.orderId;

    try{
        const order = await Order.findOne({_id});
        res.status(200).send(order);
    }catch(err){
        res.status(400).send(err);
    }
})

export default router;