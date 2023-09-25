import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
require ("dotenv").config()

export const  generateAccessToken = (id:mongoose.Types.ObjectId,username:string)=>{
    const expiresIn ="10m"
    const jwtAccessSecret : string = process.env.JWT_SECRETE!
    const accessToken = jwt.sign({id,username},jwtAccessSecret,{expiresIn})
   
    return accessToken
}
