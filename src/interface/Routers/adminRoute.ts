import { AdminLoginController } from "../Controllers/adminLoginController";
import { Router } from "express";

const adminRouter = Router()
adminRouter.get('/admin',(req,res)=>{console.log("working");res.json({status:true})})

adminRouter.post('/adminLogin',AdminLoginController)

export default adminRouter