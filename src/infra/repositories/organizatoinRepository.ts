import { Org } from "../../domain/models/Org";
import { MongoDBOrganization,orgModel } from "../database/organizationModel";

export type orgRepository = {
    create : (org : Org) => Promise <Org>
}

export const orgRepositroryImpl =(
    orgModel : MongoDBOrganization
) : orgRepository =>{

    const  create = async (org : Org) : Promise<Org>=>{
        const createOrgDetails = await orgModel.create(org)

        return createOrgDetails
    }
    return {
        create
    }

}