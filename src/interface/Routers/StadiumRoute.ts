import { Router } from "express";
import {
  filterLocation,
  stadFilter,
  stadiumController,
  stadiumDetaildView,
  stadiumEdit,
} from "../Controllers/stadiumController";
import { stadimDataFetch } from "../Controllers/stadiumController";
import { stadiumList } from "../Controllers/stadiumController";

import userVerifyToken from "../Middleware/userAuth";
import ownerVerifyToken from "../Middleware/ownerAuth";


const stadiumRouter = Router();

stadiumRouter.post("/staiumDetails",  stadiumController);
stadiumRouter.post("/fetchStadium",ownerVerifyToken,stadimDataFetch);
stadiumRouter.get("/fetchStadiumList", userVerifyToken, stadiumList);
stadiumRouter.post("/detaildView", userVerifyToken, stadiumDetaildView);
stadiumRouter.post('/editStadium',ownerVerifyToken,stadiumEdit)
stadiumRouter.post('/stadFilter',userVerifyToken,stadFilter)
stadiumRouter.post('/stadiumLocationFilter',userVerifyToken,filterLocation)

export default stadiumRouter;
