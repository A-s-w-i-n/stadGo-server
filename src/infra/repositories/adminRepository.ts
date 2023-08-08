import { admin } from "../../domain/models/admin";
import { User } from "../../domain/models/user";
import { MongoDBAdmin } from "../database/adminModel";
import { MongoDBUser, userModel } from "../database/userModel";
import { userRepository } from "./userRepositories";

export type adminRepository = {
  findByEmail: (email: string) => Promise<admin | null>;
};
export const adminRepositoryimpl = (
  AdminModel: MongoDBAdmin
): adminRepository => {
  const findByEmail = async (email: string): Promise<admin | null> => {
   

    

    const admin = await AdminModel.findOne({ email });
    
    return admin ? admin.toObject() : null;
  };

  return {
    findByEmail,
  };
};

