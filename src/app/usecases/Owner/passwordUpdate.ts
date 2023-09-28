import { ownerRepository } from "../../../infra/repositories/ownerRepositories";

export const OwnerupadatePassword = (ownerRepo : ownerRepository)=>async (email :string,changedpassword : string)=>{
    const passwordUpdate = await ownerRepo.changePassword(email,changedpassword)

    return passwordUpdate
} 