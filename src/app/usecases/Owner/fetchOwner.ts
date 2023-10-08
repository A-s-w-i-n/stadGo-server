import { Owner } from "../../../domain/models/owner";
import { ownerRepository } from "../../../infra/repositories/ownerRepositories";

export const fetchOwners =
  (ownerRepo: ownerRepository) => async (email: string, item: string) => {
    const ownerFetch: Owner[] | null = await ownerRepo.ownerFetch(email, item);

    if (ownerFetch) {
      return ownerFetch;
    }
    return ownerFetch;
  };
export const fetchOwnerById =
  (ownerRepo: ownerRepository) => async (ownerid: string) => {
    const fetch: Owner[] | null = await ownerRepo.ownerFetchById(ownerid);

    if (fetch) {
      return fetch;
    }
  };
