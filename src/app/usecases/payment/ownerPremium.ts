import { ownerRepository } from "../../../infra/repositories/ownerRepositories";
import { Owner } from "../../../domain/models/owner";
import { updateRes } from "../../../domain/models/update";

export const premiumOwner =
  (ownerRepo: ownerRepository) =>
  async (stadiumId : string,orderId : string,ownerId :string,userId : string,stadiumPrice  :string,date:string,startDate : string,endDate : string): Promise<Owner | updateRes | void> => {
    const premium = await ownerRepo.updatePremium(stadiumId,orderId,ownerId,userId,stadiumPrice,date,startDate,endDate);

    return premium;
  };
