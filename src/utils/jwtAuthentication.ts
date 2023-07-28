import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

export const  generateAccessToken = (id:mongoose.Types.ObjectId,username:string)=>{
    const expiresIn ="5m"
    const jwtAccessSecret ="Accress-Secret-Key"
    const accessToken = jwt.sign({id,username},jwtAccessSecret,{expiresIn})

    return accessToken
}