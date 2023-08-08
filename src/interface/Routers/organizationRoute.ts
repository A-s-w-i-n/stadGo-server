import { Router } from "express";
import { orgDetailsController } from "../Controllers/organizationController,";

const orgRouter = Router()

orgRouter.post('/orgDetails',orgDetailsController)


export default orgRouter


