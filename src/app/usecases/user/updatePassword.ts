import { User } from "../../../domain/models/user";
import { userRepository } from "../../../infra/repositories/userRepositories";

export const upadatePassword = (userRepo : userRepository)=>async (email :string,changedpassword : string)=>{
    const passwordUpdate = await userRepo.changePassword(email,changedpassword)

    return passwordUpdate
} 