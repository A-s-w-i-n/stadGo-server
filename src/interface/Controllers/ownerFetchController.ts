import { Request,Response } from "express";
import { ownerModel } from "../../infra/database/ownerModel";
import { fetchOwners } from "../../app/usecases/Owner/fetchOwner";
import { OwnerRepositoryImpl } from "../../infra/repositories/ownerRepositories";

const db =ownerModel


const ownerRepo = OwnerRepositoryImpl(db)


export const fetchOnwer = async (req:Request,res:Response)=>{
    try {
        const {email} =req.body
        
        const ownerDetail = await  fetchOwners(ownerRepo)(email)
        if(ownerDetail){
            
            res.status(200).json({message : "data fetched successfully",ownerDetail})
        }else{
            res.json({failed : "data fetch failed",})
        }
    } catch (error) {
        res.status(500).json({error : "internal server errror"})
        
    }
}