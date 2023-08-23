import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

const userVerifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(req.headers.authorization);

  console.log(token, "commimg");

  console.log(process.env.JWT_SECRETE as string);

  try {
    const data = jwt.verify(token!, process.env.JWT_SECRETE as string);
    if (data) {
      next();
    } else {
    }
  } catch (error) {}
};

export default userVerifyToken;
