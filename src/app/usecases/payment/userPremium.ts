import { userRepository } from "../../../infra/repositories/userRepositories";
import { User } from "../../../domain/models/user";
import { updateRes } from "../../../domain/models/update";

export const premiumUser =
  (userRepo: userRepository) =>
  async (email: string): Promise<User | updateRes | void> => {
    const premium = await userRepo.updatePremium(email);

    return premium;
  };
