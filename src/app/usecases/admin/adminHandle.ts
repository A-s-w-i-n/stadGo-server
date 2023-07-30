import { ObjectId } from "mongoose";
import { adminRepository } from "../../../infra/repositories/adminRepository";
import { userRepository } from "../../../infra/repositories/userRepositories";
import { User } from "../../../domain/models/user";
import { ownerRepository } from "../../../infra/repositories/ownerRepositories";
import { Owner } from "../../../domain/models/owner";
import { updateRes } from "../../../domain/models/update";

export const fetchUsers = (userRepo: userRepository) => async () => {
  const adminfetchUser: User[] = await userRepo.findUser();

  if (adminfetchUser) {
    return adminfetchUser;
  }

  return adminfetchUser;
};
export const fetchOwner = (ownerRepo: ownerRepository) => async () => {
  const adminfetchOwner: Owner[] = await ownerRepo.findOwner();
  if (adminfetchOwner) {
    return adminfetchOwner;
  }
};
export const userBlock =
  (userRepository: userRepository) =>
  async (id: string): Promise<User | updateRes | void> => {
    const blockusers = await userRepository.blockUsers(id);

    return blockusers;
  };
export const userUnblock =
  (userRepository: userRepository) =>
  async (id: string): Promise<User | updateRes | void> => {
    const userunblock = await userRepository.unblcokuser(id);

    return userunblock;
  };

export const ownerBlock =
  (onwerRepository: ownerRepository) =>
  async (id: string): Promise<Owner | updateRes | void> => {
    const blockusers = await onwerRepository.blockOwners(id);

    return blockusers;
  };
  export const ownerUnblock =
  (ownerRepository: ownerRepository) =>
  async (id: string): Promise<Owner | updateRes | void> => {
    const ownerunblock = await ownerRepository.unblcokowner(id);

    return ownerunblock;
  };

