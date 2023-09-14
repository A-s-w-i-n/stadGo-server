import { userRepository } from "../../../infra/repositories/userRepositories";
import { User } from "../../../domain/models/user";
import { updateRes } from "../../../domain/models/update";

export const premiumUser =
  (userRepo: userRepository) =>
  async (stadiumId: string,orderId:string,email :string): Promise<User | updateRes | void> => {
    const premium = await userRepo.updatePremium(stadiumId,orderId,email);

    return premium;
  };
