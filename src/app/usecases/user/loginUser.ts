import { userRepository } from "../../../infra/repositories/userRepositories";

export const login  = (UserRepository : userRepository)=>async(email : string,Password : string)=>{
    const userEmailExist = await UserRepository.findByEmail(email)
    if(userEmailExist&&userEmailExist.password==Password){
        return userEmailExist
    }
    return null
}
