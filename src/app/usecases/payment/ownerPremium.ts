import { ownerRepository } from "../../../infra/repositories/ownerRepositories";
import { Owner } from "../../../domain/models/owner";
import { updateRes } from "../../../domain/models/update";

export const premiumOwner = (ownerRepo : ownerRepository)=>async (email : string) : Promise<Owner | updateRes |void> =>{
    
    
    const premium = await ownerRepo.updatePremium(email)

    return premium
}