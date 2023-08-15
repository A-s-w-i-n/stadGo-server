import { Request,Response } from "express";
import { ownerModel } from "../../infra/database/ownerModel";
import { OwnerRepositoryImpl } from "../../infra/repositories/ownerRepositories";
import { premiumOwner } from "../../app/usecases/payment/ownerPremium";
import { userModel } from "../../infra/database/userModel";
import { UserRepositoryImpl } from "../../infra/repositories/userRepositories";
import { premiumUser } from "../../app/usecases/payment/userPremium";


const db = ownerModel
const userDB =userModel

const ownerRepo = OwnerRepositoryImpl(db)
const userRepo = UserRepositoryImpl(userDB)


export const premiumController = async (req:Request,res : Response)=>{
    try {
        const {email} = req.body
    
        const setPremium = await premiumOwner(ownerRepo)(email)
    
        if(setPremium){
            res.status(200).json({success : "premmium updated"})
        }else{
            res.json({failed : "premium is not upadated"})
        }
        
    } catch (error) {
        res.status(500).json({error : "ineternal server error"})
    }
}
export const userPremiumController = async (req:Request,res : Response)=>{
    try {
        const {email} = req.body
    
        const setPremium = await premiumUser(userRepo)(email)
    
        if(setPremium){
            res.status(200).json({success : "premmium updated"})
        }else{
            res.json({failed : "premium is not upadated"})
        }
        
    } catch (error) {
        res.status(500).json({error : "ineternal server error"})
    }
}