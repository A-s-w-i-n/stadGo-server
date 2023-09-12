import { Org } from "../../../domain/models/Org";
import { orgRepository } from "../../../infra/repositories/organizatoinRepository";

export const createOrg =
  (orgRepository: orgRepository) =>
  async (organizationname: string,organizationtype: string,sportstype: string,country: string,email: string): Promise<Org> => {
    const newOrg: Org = {organizationname,organizationtype,sportstype,country,email};

    const createOrganization = await orgRepository.create(newOrg);

    return createOrganization;
  };
