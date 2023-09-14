import { Owner } from "../../../domain/models/owner";
import { ownerRepository } from "../../../infra/repositories/ownerRepositories";

export const fetchOwners =
  (ownerRepo: ownerRepository) => async (email: string) => {
    const ownerFetch: Owner[] | null = await ownerRepo.ownerFetch(email);

    if (ownerFetch) {
      return ownerFetch;
    }
    return ownerFetch;
  };
  export const fetchOwnerById = (ownerRepo : ownerRepository)=>async (ownerid : string)=>{
    const fetch : Owner[] | null = await ownerRepo.ownerFetchById(ownerid)

    if(fetch){
      return fetch
    }
  }
