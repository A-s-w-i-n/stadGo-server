import { Request, Response } from "express";
import { orgModel } from "../../infra/database/organizationModel";
import { createOrg } from "../../app/usecases/organization/orgDetails";
import { orgRepositroryImpl } from "../../infra/repositories/organizatoinRepository";
import { findOrg } from "../../app/usecases/organization/orgFetch";

const db = orgModel;
const orgRepository = orgRepositroryImpl(db);

export const orgDetailsController = async (req: Request, res: Response) => {
  const { organizationname, organizationtype, sportstype, country, email } =
    req.body;

  try {
    const Organization = createOrg(orgRepository)(
      organizationname,
      organizationtype,
      sportstype,
      country,
      email
    );
    res.status(200).json({ message: "data found", Organization });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const fetchOrgController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    

    const fetchOrg = await findOrg(orgRepository)(email);
   
      
      res
        .status(200)
        .json({ success: "organization data fecth successfull", fetchOrg });
    
  } catch (error) {}
};
