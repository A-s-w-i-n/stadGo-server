import { Router } from "express";
import {
  booked,
  changeStatus,
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
stadiumRouter.get("/fetchStadiumList", stadiumList);
stadiumRouter.post("/detaildView", userVerifyToken, stadiumDetaildView);
stadiumRouter.post('/editStadium',ownerVerifyToken,stadiumEdit)
stadiumRouter.post('/stadFilter',userVerifyToken,stadFilter)
stadiumRouter.post('/stadiumLocationFilter',userVerifyToken,filterLocation)
stadiumRouter.post('/bookedCheck',userVerifyToken,booked)
stadiumRouter.post('/changeStatus',changeStatus)


export default stadiumRouter;
  