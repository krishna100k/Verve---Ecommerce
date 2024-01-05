import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: any;
}


const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const secretKey = process.env.secretKey;

    if (!secretKey) {
      return
    }

    const authHeader: string | undefined = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    const tokenArray: string[] | undefined = authHeader.split(" ");

    if (!tokenArray || tokenArray.length < 2) {
      return res
        .status(401)
        .json({ error: "Token is missing from Authorization header" });
    }

    const token: string = tokenArray[1];

    jwt.verify(token, secretKey, (err, user: any) => {
      if (err) {
        return res.status(401).json({ message: "Token is not valid", err });
      } else {
        req.user = user as any;
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};


const verifyTokenAndAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user?.id !== req.params.id) {
      res.status(401).send("You are not allowed to do this action!");
    }else{
        next();
    }
  });
};


const verifyTokenAndAdmin = (req:CustomRequest, res:Response, next:NextFunction) => {
    verifyToken(req, res , ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(400).send("You are not an admin")
        }
    })
}


export { verifyTokenAndAuth, verifyTokenAndAdmin };
export default verifyToken;
