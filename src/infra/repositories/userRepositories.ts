import mongoose, { Model, Document } from "mongoose";
import { User } from "../../domain/models/user";
import { MongoDBUser, userModel } from "../database/userModel";
import { updateRes } from "../../domain/models/update";

export type userRepository = {
  findByEmail: (email: string) => Promise<User | null>;
  create: (user: User) => Promise<User>;
  findUser: () => Promise<User[]>;
  blockUsers(id: string): Promise<User | updateRes | void>;
  unblcokuser(id: string): Promise<User | void | updateRes>;
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
  return {
    findByEmail,
    create,
    findUser,
    blockUsers,
    unblcokuser,
  };
};
