import mongoose, { Model, Document } from "mongoose";
import { User } from "../../domain/models/user";
import { MongoDBUser, userModel } from "../database/userModel";
import { updateRes } from "../../domain/models/update";
import { ObjectId } from "bson";

export type userRepository = {
  findByEmail: (email: string) => Promise<User | null>;
  create: (user: User) => Promise<User>;
  findUser: () => Promise<User[]>;
  blockUsers(id: string): Promise<User | updateRes | void>;
  unblcokuser(id: string): Promise<User | void | updateRes>;
  updatePremium(stadiumId :string,orderId :string,email : string): Promise<User | void | updateRes>;
  userFetch(emai: string): Promise<User | null>;
  updataProfile(id: string, url: string): Promise<User | updateRes | void | null>;
  findProfileImg(id: string): Promise<User | null>;
};

export const UserRepositoryImpl = (UserModel: MongoDBUser): userRepository => {
  const findByEmail = async (email: string): Promise<User | null> => {
    const user = await UserModel.findOne({ email });

    return user ? user.toObject() : null;
  };

  const create = async (user: User): Promise<User> => {
    const createUser = await UserModel.create(user);

    return createUser.toObject();
  };
  const findUser = async (): Promise<User[]> => {
    const adminUsersFetch = await UserModel.find();

    return adminUsersFetch;
  };
  const blockUsers = async (id: string): Promise<User | void | updateRes> => {
    const result = await userModel.updateOne(
      { _id: id },
      { $set: { isblocked: true } }
    );
    if (result.matchedCount > 0) {
      return result;
    }
  };
  const unblcokuser = async (id: string): Promise<User | void | updateRes> => {
    const result = await userModel.updateOne(
      { _id: id },
      { $set: { isblocked: false } }
    );

    if (result.matchedCount > 0) {
      return result;
    }
  };
  const updatePremium = async (
    stadiumId :string,orderId :string,email:string
  ): Promise<User | void | updateRes> => {
    console.log(stadiumId,orderId,email);
    
    const result = await userModel.updateOne(
      {email : email},{$push :{ paymentDetails:{orderId : orderId,stadiumId : stadiumId}}},
    );

   
      return result;
    
  };
  const userFetch = async (email: string): Promise<User | null> => {
    const result = await userModel.findOne({ email });

    return result;
  };
  const updataProfile = async (
    id: string,
    url: string
  ): Promise<User | updateRes | null | void> => {
    const objectId = new ObjectId(id);
    const result = await userModel.findOneAndUpdate(
      { _id: objectId },
      { $set: { profileImg: url } }
    );
    if(result){
      return result;
    }

  };
  const findProfileImg = async (id: string): Promise<User | null> => {
    const objectId = new ObjectId(id);

    const result = await userModel.findOne({ _id: objectId });

    return result;
  };

  return {
    findByEmail,
    create,
    findUser,
    blockUsers,
    unblcokuser,
    updatePremium,
    userFetch,
    updataProfile,
    findProfileImg,
  };
};
