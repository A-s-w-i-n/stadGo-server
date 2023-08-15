import { stadium } from "../../../domain/models/stadium";
import { stadiumRepository } from "../../../infra/repositories/stadiumRepository";

export const fetchStadiumList =
  (stadiumRepo: stadiumRepository) => async () => {
    const fetchList: stadium[] = await stadiumRepo.findStadiumList();

    if (fetchList) {
      return fetchList;
    }
    return fetchList;
  };
export const fetchDetaildView =
  (stadiumRepo: stadiumRepository) => async (id: string) => {
    const fectchDetails: stadium | null = await stadiumRepo.findStadiumById(id);

    if (fectchDetails) {
      return fectchDetails;
    }
    return fectchDetails;
  };
