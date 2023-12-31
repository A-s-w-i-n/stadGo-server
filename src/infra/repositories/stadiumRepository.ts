import { type } from "os";
import { stadium } from "../../domain/models/stadium";
import { MongoDBStadium } from "../database/stadiumModel";
import { ObjectId } from "bson";
import { updateRes } from "../../domain/models/update";

export type stadiumRepository = {
  create: (stadium: stadium) => Promise<stadium>;
  findStadiumByEmail: (email: string) => Promise<stadium[] | null>;
  findStadiumList: () => Promise<stadium[]>;
  filterStadium: (
    firstValue: string,
    secondValue: string
  ) => Promise<stadium[] | stadium | null>;
  filterLocation: (location: string) => Promise<stadium[] | stadium | null>;
  findStadiumById: (id: string) => Promise<stadium | null>;
  uplodeVideo: (
    id: string,
    uplodeVideo: string
  ) => Promise<stadium | updateRes | undefined>;

  editStadium(
    id: string,
    stadiumname: string,
    sportstype: string,
    fromdate: string,
    todate: string,
    price: string,
    discription: string
  ): Promise<stadium | void | updateRes | null>;

  bookedCheck(booked : string) : Promise<stadium | null | updateRes>
  updateStatus(email : string) : Promise<stadium | null | updateRes>
};

export const stadiumRepositoryImpl = (
  stadiumModel: MongoDBStadium
): stadiumRepository => {
  const create = async (stadium: stadium): Promise<stadium> => {
    const addStadium = await stadiumModel.create(stadium);

    return addStadium;
  };
  const findStadiumByEmail = async (email: string): Promise<stadium[] | null> => {
    const fetchStadiumData = await stadiumModel.find({ email });
    return fetchStadiumData ? fetchStadiumData : null;
  };
  const findStadiumList = async (): Promise<stadium[]> => {
    const stadiumList = await stadiumModel.find();
    return stadiumList;
  };
  const findStadiumById = async (id: string): Promise<stadium | null> => {
    const objectID = new ObjectId(id);

    const detaildView = await stadiumModel.findOne({ _id: objectID });

    return detaildView;
  };

  const uplodeVideo = async (
    id: string,
    uplodeVideo: string
  ): Promise<stadium | updateRes | undefined> => {
    const objectID = new ObjectId(id);

    const videoUplodes = await stadiumModel.updateOne(
      { _id: objectID },
      { $set: { video: uplodeVideo } }
    );

    if (videoUplodes.modifiedCount > 0) {
      return videoUplodes;
    }
  };

  const editStadium = async (
    id: string,
    stadiumname: string,
    sportstype: string,
    fromdate: string,
    todate: string,
    price: string,
    discription: string
  ): Promise<stadium | void | updateRes | null> => {
    const objectID = new ObjectId(id);
    const result = await stadiumModel.findOneAndUpdate(
      { _id: objectID },
      {
        $set: { stadiumname, sportstype, fromdate, todate, price, discription },
      }
    );

    return result;
  };
  const filterStadium = async (
    firstValue: string,
    secondValue: string
  ): Promise<stadium[] | stadium | null> => {
    const filter = await stadiumModel.find({
      $and: [{ maxcapacity: { $gte: firstValue, $lte: secondValue } }],
    });

    return filter;
  };
  const filterLocation = async (
    location: string
  ): Promise<stadium[] | stadium | null> => {
    const filter = await stadiumModel.find({ location: location });

    return filter;
  };
  const bookedCheck = async (booked : string):Promise<stadium | null | updateRes>=>{
    const id =new ObjectId(booked)
    const check = await stadiumModel.updateOne({_id : id},{$set : {isBooked : true}})

    return check ? check : null

  }
  const updateStatus = async (email : string):Promise<stadium | null | updateRes>=>{
    const check = await stadiumModel.updateOne({email : email},{$set : {isBooked : false}})

    return check ? check : null

  }


  return {
    create,
    findStadiumByEmail,
    findStadiumList,
    findStadiumById,
    uplodeVideo,
    editStadium,
    filterStadium,
    filterLocation,
    bookedCheck,
    updateStatus
  };
};
