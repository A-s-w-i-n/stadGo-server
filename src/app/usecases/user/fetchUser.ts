import { User } from "../../../domain/models/user";
import { userRepository } from "../../../infra/repositories/userRepositories";

export const fetchUsers = (userRepo : userRepository)=>async (email : string)=>{
    console.log(email,"kkkkkkkkkk");
    
    const userFetch : User | null = await userRepo.userFetch(email)

  
        return userFetch ? userFetch : null
    
}