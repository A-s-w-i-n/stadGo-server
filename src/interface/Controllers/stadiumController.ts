import { Request, Response } from "express";
import { stadiumModel } from "../../infra/database/stadiumModel";
import { addStadium } from "../../app/usecases/stadium/stadiumDetails";
import { stadiumRepositoryImpl } from "../../infra/repositories/stadiumRepository";
import { fetchStadium } from "../../app/usecases/stadium/fetchStadiumData";
import {
  fetchDetaildView,
  fetchStadiumList,
} from "../../app/usecases/stadium/fetchStadiumList";
import { updateVideo } from "../../app/usecases/stadium/videoUplode";
import mongoose from "mongoose";
import { editStadiumDetail } from "../../app/usecases/stadium/editStadium";

const db = stadiumModel;
const stadiumRepository = stadiumRepositoryImpl(db);

export const stadiumController = async (req: Request, res: Response) => {
  const {
    stadiumname,
    maxcapacity,
    sportstype,
    fromdate,
    todate,
    price,
    image,
    discription,
    location,
    email,
    id,
  } = req.body;

  const newId = new mongoose.Types.ObjectId(id);
  try {
    const Stadium = addStadium(stadiumRepository)(
      stadiumname,
      maxcapacity,
      sportstype,
      fromdate,
      todate,
      price,
      image,
      discription,
      location,
      email,
      newId
    );

    res.status(200).json({ message: "stadium added", Stadium });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
export const stadimDataFetch = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const fetchStadiumData = await fetchStadium(stadiumRepository)(email);

    if (fetchStadiumData) {
      res
        .status(200)
        .json({ sucess: "data fetch successfull", fetchStadiumData });
    } else {
      res.json({ falid: "no stadium data" });
    }
  } catch (error) {
    res.status(500).json({ message: " internal server eroor" });
  }
};
export const stadiumList = async (req: Request, res: Response) => {
  try {
    const fetchList = await fetchStadiumList(stadiumRepository)();

    if (fetchList) {
      res.status(200).json({ success: "data fetch success full", fetchList });
    } else {
      res.json({ faild: "no stadium data" });
    }
  } catch {
    res.status(500).json({ error: "intenal server error" });
  }
};

export const stadiumDetaildView = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const fetchDetails = await fetchDetaildView(stadiumRepository)(id);

    if (fetchDetails) {
      res
        .status(200)
        .json({ success: "data fetch successfully", fetchDetails });
    } else {
      res.json({ fail: "data fecthing failed" });
    }
  } catch {
    res.status(500).json({ error: "internal server error" });
  }
};
export const updateVideoUplode = async (req: Request, res: Response) => {
  try {
    const { id, uplodeVideo } = req.body;

    const uplode = await updateVideo(stadiumRepository)(id, uplodeVideo);

    if (uplode) {
      res.status(200).json({ success: "video uplode sucess", status: true });
    } else {
      res.json({ falied: "video uplode failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
export const stadiumEdit = async(req:Request,res:Response)=>{
  try {
    const {id,sportstype,fromdate,todate,price,discription}=req.body

    const edit = await editStadiumDetail(stadiumRepository)(id,sportstype,fromdate,todate,price,discription)

    if(edit){
      res.status(200).json({success : "stadium details updated successFully"})
    }else{
      res.json({failed : "edit update details failed"})
    }
  } catch (error) {
    res.status(500).json({error : "internal server error"})
  }
}
