import { Request,Response } from "express";
import { ownerModel } from "../../infra/database/ownerModel";
import { OwnerRepositoryImpl } from "../../infra/repositories/ownerRepositories";
import { premiumOwner } from "../../app/usecases/payment/ownerPremium";


const db = ownerModel

const ownerRepo = OwnerRepositoryImpl(db)

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