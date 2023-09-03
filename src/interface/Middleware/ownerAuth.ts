import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

const ownerVerifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const token = req.headers.ownerAuthorization?.split(" ")[1];
  // console.log(req.headers);
 const token = ""
//  req.headers.ownerAuthorization?.split("")[1]
  console.log(token, "commimgggggggggggggggggggg");

  console.log(process.env.JWT_SECRETE as string);

  try {
    const data = jwt.verify(token!, process.env.JWT_SECRETE as string);
    if (data) {
      next();
    } else {
    }
  } catch (error) {}
};

export default ownerVerifyToken;
