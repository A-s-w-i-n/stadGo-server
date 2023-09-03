import { Org } from "../../../domain/models/Org";
import { orgRepository } from "../../../infra/repositories/organizatoinRepository";

export const findOrg =
  (orgRepository: orgRepository) => async (email: string) => {
    const findOrganization: Org | null = await orgRepository.findByEmail(email);
    
    

    return findOrganization ? findOrganization : null;
  };
