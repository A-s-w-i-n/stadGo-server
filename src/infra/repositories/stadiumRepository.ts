import { type } from "os";
import { stadium } from "../../domain/models/stadium";
import { MongoDBStadium } from "../database/stadiumModel";
import { ObjectId } from "bson";
import { updateRes } from "../../domain/models/update";

export type stadiumRepository = {
  create: (stadium: stadium) => Promise<stadium>;
  findStadiumByEmail: (email: string) => Promise<stadium[]>;
  findStadiumList: () => Promise<stadium[]>;
  filterStadium : (firstValue : string,secondValue : string) => Promise<stadium[]| stadium | null | undefined>
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
};

export const stadiumRepositoryImpl = (
  stadiumModel: MongoDBStadium
): stadiumRepository => {
  const create = async (stadium: stadium): Promise<stadium> => {
    const addStadium = await stadiumModel.create(stadium);

    return addStadium;
  };
  const findStadiumByEmail = async (email: string): Promise<stadium[]> => {
    const fetchStadiumData = await stadiumModel.find({ email });
    return fetchStadiumData;
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
    const result = await stadiumModel.findOneAndUpdate(
      { id: id },
      {
        $set: { stadiumname, sportstype, fromdate, todate, price, discription },
      }
    );

    return result;
  };
  const filterStadium = async (firstValue : string,secondValue : string) : Promise<stadium[]| stadium | null | undefined>=>{
    console.log(firstValue,secondValue);
    
    const filter = await stadiumModel.findOne({$and :[{maxcapacity : {$gte :firstValue,$lte : secondValue }}]})


    
      return filter
    
  }

  return {
    create,
    findStadiumByEmail,
    findStadiumList,
    findStadiumById,
    uplodeVideo,
    editStadium,
    filterStadium
  };
};
