import { Org } from "../../domain/models/Org";
import { MongoDBOrganization, orgModel } from "../database/organizationModel";

export type orgRepository = {
  create: (org: Org) => Promise<Org>;
  findByEmail: (email: string) => Promise<Org | null>;
};

export const orgRepositroryImpl = (
  orgModel: MongoDBOrganization
): orgRepository => {
  const create = async (org: Org): Promise<Org> => {
    const createOrgDetails = await orgModel.create(org);

    return createOrgDetails;
  };
  const findByEmail = async (email: string): Promise<Org | null> => {
    const findOrgDetail = await orgModel.findOne({ email });
    console.log(findOrgDetail);
    return findOrgDetail ? findOrgDetail : null;
  };
  return {
    create,
    findByEmail,
  };
};
