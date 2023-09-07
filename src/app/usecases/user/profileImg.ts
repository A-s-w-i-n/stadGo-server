import { userRepository } from "../../../infra/repositories/userRepositories";

export const userUpdateImg =
  (userRepo: userRepository) => async (id: string, url: string) => {
    const UpdateImg = await userRepo.updataProfile(id, url);
    if (UpdateImg) {
      return UpdateImg;
    }
  };
export const fecthUserImage =
  (userRepo: userRepository) => async (id: string) => {
    const fetchImg = await userRepo.findProfileImg(id);

    if (fetchImg) {
      return fetchImg;
    }
    return fetchImg;
  };
