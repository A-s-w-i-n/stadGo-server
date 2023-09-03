import { Router } from "express";
import {
  fetchOrgController,
  orgDetailsController,
} from "../Controllers/organizationController,";
import userVerifyToken from "../Middleware/userAuth";
// import verifyToken from "../Middleware/middleware";
const orgRouter = Router();

orgRouter.post("/orgDetails", orgDetailsController);
orgRouter.post("/fetchOrg", fetchOrgController);

export default orgRouter;
