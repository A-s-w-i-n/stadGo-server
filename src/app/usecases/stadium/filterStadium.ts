import { stadiumRepository } from "../../../infra/repositories/stadiumRepository";

export const stadiumFilter =
  (stadiumRepo: stadiumRepository) =>
  async (firstValue: string, secondValue: string) => {
    const filterStadium = await stadiumRepo.filterStadium(
      firstValue,
      secondValue
    );

    if (filterStadium) {
      return filterStadium;
    }
    return null;
  };
export const locationFilter =
  (stadiumRepo: stadiumRepository) => async (location: string) => {
    const filterStadium = await stadiumRepo.filterLocation(location);

    if (filterStadium) {
      return filterStadium;
    }

    return null;
  };
