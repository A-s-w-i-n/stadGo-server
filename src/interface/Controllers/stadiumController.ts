import { Request, Response } from "express";
import { stadiumModel } from "../../infra/database/stadiumModel";
import { addStadium } from "../../app/usecases/stadium/stadiumDetails";
import { stadiumRepositoryImpl } from "../../infra/repositories/stadiumRepository";
import { fetchStadium } from "../../app/usecases/stadium/fetchStadiumData";
import { fetchDetaildView, fetchStadiumList } from "../../app/usecases/stadium/fetchStadiumList";

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
  } = req.body;

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
      email
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

export const stadiumDetaildView = async (req:Request,res : Response)=>{

  try{
    const {id} = req.body
    
    const fetchDetails =await  fetchDetaildView(stadiumRepository)(id)

    if(fetchDetails){
      res.status(200).json({success : "data fetch successfully",fetchDetails})
    }else{
      res.json({fail : "data fecthing failed"})
    }
  }catch{
    res.status(500).json({error : "internal server error"})
  }
}