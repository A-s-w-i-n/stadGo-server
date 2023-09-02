import { stadiumRepository } from "../../../infra/repositories/stadiumRepository";
import { stadium } from "../../../domain/models/stadium";

export const fetchStadium =
  (stadiumRepo: stadiumRepository) => async (email: string) => {
    const stadiumFetch: stadium[] = await stadiumRepo.findStadiumByEmail(email);

    if (stadiumFetch) {
      return stadiumFetch;
    }
    return stadiumFetch;
  };
