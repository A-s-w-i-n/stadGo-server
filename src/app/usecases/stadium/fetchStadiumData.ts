import { stadiumRepository } from "../../../infra/repositories/stadiumRepository";
import { stadium } from "../../../domain/models/stadium";

export const fetchStadium =
  (stadiumRepo: stadiumRepository) => async (email: string) => {
    const stadiumFetch: stadium[] | null= await stadiumRepo.findStadiumByEmail(email);


    if (stadiumFetch) {
      return stadiumFetch ? stadiumFetch : null;
    }
    return stadiumFetch;
  };
