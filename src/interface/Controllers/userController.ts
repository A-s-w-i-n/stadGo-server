import { Request,Response, json } from "express";
import { userModel } from "../../infra/database/userModel";
import { UserRepositoryImpl } from "../../infra/repositories/userRepositories";
import { signupUser } from "../../app/usecases/user/signupUser";
import { generateAccessToken } from "../../utils/jwtAuthentication";

const db =userModel

const userRepository = UserRepositoryImpl(db)

export const userSignController = async (req : Request,res:Response)=>{
   
    
    const {firstname,lastname,username,email,phone,password,isGoogle} =req.body
    console.log(req.body);
    const premium =false
    const isblocked = false
    
    try{
        const user =await signupUser(userRepository)(firstname,lastname,username,email,password,isblocked,premium,phone,isGoogle)

        res.status(201).json({message : "data found",user})
    }catch{
        res.status(500).json({ message : "internal server error"})

    }

}





