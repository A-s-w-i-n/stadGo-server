import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

const userVerifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
console.log(req.headers,"user");

  const token = req.headers.authorization?.split(" ")[1];
  try {
    const data = jwt.verify(token!, process.env.JWT_SECRETE as string);
    console.log(data);
    
    if (data) {
      next();
    } else {
    }
  } catch (error) {}
};

export default userVerifyToken;
