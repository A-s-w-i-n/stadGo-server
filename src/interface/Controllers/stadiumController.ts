import { Request, Response } from "express";
import { stadiumModel } from "../../infra/database/stadiumModel";
import { addStadium } from "../../app/usecases/stadium/stadiumDetails";
import { stadiumRepositoryImpl } from "../../infra/repositories/stadiumRepository";
import { fetchStadium } from "../../app/usecases/stadium/fetchStadiumData";
import {
  fetchDetaildView,
  fetchStadiumList,
} from "../../app/usecases/stadium/fetchStadiumList";
import {
  locationFilter,
  stadiumFilter,
} from "../../app/usecases/stadium/filterStadium";
import { updateVideo } from "../../app/usecases/stadium/videoUplode";
import mongoose from "mongoose";
import { changeBooked, checkBooked, editStadiumDetail } from "../../app/usecases/stadium/editStadium";

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
export const stadiumEdit = async (req: Request, res: Response) => {
  try {
    const {
      id,
      stadiumname,
      sportstype,
      fromdate,
      todate,
      price,
      discription,
    } = req.body;

    const edit = await editStadiumDetail(stadiumRepository)(
      id,
      stadiumname,
      sportstype,
      fromdate,
      todate,
      price,
      discription
    );

    if (edit) {
      res
        .status(200)
        .json({ success: "stadium details updated successFully", edit });
    } else {
      res.json({ failed: "edit update details failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
export const stadFilter = async (req: Request, res: Response) => {
  try {
    const { firstValue, secondValue } = req.body;

    const filter = await stadiumFilter(stadiumRepository)(
      firstValue,
      secondValue
    );

    if (filter) {

      res.status(200).json({ message: "success filtering",  filter });
    } else {
      res.json({ fail: "stadium filter failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
export const filterLocation = async (req: Request, res: Response) => {
  try {
    const { location } = req.body;

    const filter = await locationFilter(stadiumRepository)(location);

    if (filter) {
      res.status(200).json({ message: "success filtering", filter });
    } else {
      res.json({ fail: "filtering falied" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
export const  booked = async (req : Request,res : Response)=>{
  try {
    const {booked} = req.body
    console.log(req.body,"wwwwwwwww");
    

    const check = await checkBooked(stadiumRepository)(booked)

    if(check){
      res.status(200).json({message : "booking is confirmed"})
    }else{
      res.json({fail : "booking failed"})
    }
  } catch (error) {
    res.status(500).json({error : "internal server error"})
  }
}
export const  changeStatus = async (req : Request,res : Response)=>{
  try {
    const {email} = req.body
    console.log(req.body,"wwwwwwwww");
    

    const check = await changeBooked(stadiumRepository)(email)

    if(check){
      res.status(200).json({message : "Status changed"})
    }else{
      res.json({fail : "booking failed"})
    }
  } catch (error) {
    res.status(500).json({error : "internal server error"})
  }
}
