import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

const ownerVerifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 
console.log(req.headers,'owner');

 const token : string =(req.headers.ownerauthorization! as string).split(" ")[1]
 console.log(token);
  


  try {
    const data = jwt.verify(token!, process.env.JWT_SECRETE as string);
    if (data) {
      console.log(data,'llll');
      
      next();
    } else { 
    }
  } catch (error) {}
};

export default ownerVerifyToken;  
