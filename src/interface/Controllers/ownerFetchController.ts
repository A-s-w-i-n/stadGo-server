import { Request, Response } from "express";
import { ownerModel } from "../../infra/database/ownerModel";
import { fetchOwnerById, fetchOwners } from "../../app/usecases/Owner/fetchOwner";
import { OwnerRepositoryImpl } from "../../infra/repositories/ownerRepositories";
import {  userDetails, userList } from "../../app/usecases/Owner/userList";

const db = ownerModel;

const ownerRepo = OwnerRepositoryImpl(db);

export const fetchOnwer = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const ownerDetail = await fetchOwners(ownerRepo)(email);
    if (ownerDetail) {
      res
        .status(200)
        .json({ message: "data fetched successfully", ownerDetail });
    } else {
      res.json({ failed: "data fetch failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server errror" });
  }
};
export const fetchOwnerByid = async(req: Request,res : Response)=>{
  try {
    const {id} = req.body

    const fetch = await fetchOwnerById(ownerRepo)(id)
    if(fetch){
res.status(200).json({message : "fetch success",fetch})
    }else{
      res.json({fail : "fetch failed"})
    }
  } catch (error) {
    res.status(500).json({error : "internal server error"})
  }
}
export const userinfo = async (req: Request, res: Response) => {
  try {
    const { userId, ownerid } = req.body;
    // console.log(req.body,"details");
    
    const listUser = await userDetails(ownerRepo)(userId, ownerid);
    if (listUser) {
      res.status(200).json({ message: "userList added success",listUser });
    } else {
      res.json({ fali: "userList add failed" });
    }
  } catch (error) {   
    res.status(500).json({ error: "internal server error" });
  }
};
export const listUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const userLists = await userList(ownerRepo)(id);
    if (userLists) {
      res.status(200).json({ message: "owner userList fectched" });
    } else {
      res.json({ fali: " owner userLIst fetch failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
