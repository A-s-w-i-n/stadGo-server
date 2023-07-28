import { Model,Document } from "mongoose";
import { User } from "../../domain/models/user";
import { MongoDBUser } from "../database/userModel";

;
export type userRepository = {
   
    findByEmail : (email : string) => Promise<User | null >
    create : (user:User)=>Promise<User> 
}

export const UserRepositoryImpl =(UserModel : MongoDBUser):userRepository=>{
    
    const findByEmail = async (email : string):Promise<User | null> =>{
        const user = await UserModel.findOne({email});
        return  user ? user.toObject() : null
        
        
    }
   
    const create = async (user : User) : Promise<User>=>{
        console.log("creatinggggg");
       
        
        
        const createUser = await UserModel.create(user)
        console.log("guser");

        return createUser.toObject()
    }
    return {
        findByEmail,
        create
    }
}