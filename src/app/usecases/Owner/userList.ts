import { Owner } from "../../../domain/models/owner";
import { updateRes } from "../../../domain/models/update";
import { ownerRepository } from "../../../infra/repositories/ownerRepositories";


export const userDetails = (ownerRepo : ownerRepository)=>async(userId : string,ownerid : string)=>{
    
    const listUser  : Owner[] | null | updateRes = await ownerRepo.userInfo(userId,ownerid)

    if(listUser){
        return listUser
    }
}
export const userList = (ownerRepo : ownerRepository)=>async(id : string)=>{
    const userList  : Owner[] | null = await ownerRepo.userList(id)

    if(userList){
        return userList
    }
}