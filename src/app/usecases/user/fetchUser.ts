import { User } from "../../../domain/models/user";
import { userRepository } from "../../../infra/repositories/userRepositories";

export const fetchUsers = (userRepo : userRepository)=>async (email : string)=>{
    const userFetch : User | null = await userRepo.userFetch(email)

    if(userFetch){
        return userFetch
    }
}