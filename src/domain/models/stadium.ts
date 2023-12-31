import mongoose from "mongoose";

export interface stadium {
  _id?: string;
  stadiumname: string;
  maxcapacity: string;
  sportstype: string;
  fromdate: string;
  todate: string;
  price: string;
  image: string[];
  discription: string;
  location: string;
  email?: string;
  video?: string;
  id?: mongoose.Types.ObjectId;
  isBooked? : Boolean
}
