import { Router } from "express";
import { stadiumController } from "../Controllers/stadiumController";
import { stadimDataFetch } from "../Controllers/stadiumController";
import { stadiumList } from "../Controllers/stadiumController";

const stadiumRouter = Router()

stadiumRouter.post('/staiumDetails',stadiumController)
stadiumRouter.post('/fetchStadium',stadimDataFetch)
stadiumRouter.get('/fetchStadiumList',stadiumList)

export default  stadiumRouter

