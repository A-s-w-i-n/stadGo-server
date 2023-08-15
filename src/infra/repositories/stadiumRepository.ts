import { type } from "os";
import { stadium } from "../../domain/models/stadium";
import { MongoDBStadium } from "../database/stadiumModel";
import { ObjectId } from "bson";

export type stadiumRepository = {
  create: (stadium: stadium) => Promise<stadium>;
  findStadiumByEmail: (email: string) => Promise<stadium[]>;
  findStadiumList: () => Promise<stadium[]>;
  findStadiumById: (id: string) => Promise<stadium | null>;
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
    console.log(objectID);

    const detaildView = await stadiumModel.findOne({ _id: objectID });
    console.log(detaildView);

    return detaildView;
  };
  return {
    create,
    findStadiumByEmail,
    findStadiumList,
    findStadiumById,
  };
};
