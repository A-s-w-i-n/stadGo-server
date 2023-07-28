import { Request,Response } from "express";
import { ownerModel } from "../../infra/database/ownerModel";
import { OwnerRepositoryImpl } from "../../infra/repositories/ownerRepositories";
import { signUpOwner } from "../../app/usecases/Owner/signupOwner";

const db =ownerModel

const ownerRepository =OwnerRepositoryImpl(db)


export const ownerSignUpController = async (req : Request, res:Response)=>{
    const {firstname,lastname,ownername,email,password,phone,companyname,location}=req.body
    console.log(req.body);
    const premium =false
    const isblocked =false
    try {
        
        const owner = await signUpOwner(ownerRepository)(firstname,lastname,ownername,password,email,companyname,phone,location,isblocked,premium)
        console.log("hkooooooo");
        res.status(201).json({messgae : "data found",owner})
    } catch (error) {
        res.status(500).json({message: "internal server error"})
    }
    
}
