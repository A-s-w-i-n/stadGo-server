import { ownerRepository } from "../../../infra/repositories/ownerRepositories";

export const OwnerLogin = (ownerRepository : ownerRepository)=>async(email:string,password:string)=>{
    const ownerEmailExist = await ownerRepository.findByEmail(email)
    console.log("commmmmmm");
    

    if(ownerEmailExist&&ownerEmailExist.password==password){
        return  ownerEmailExist
    }
    return null
}