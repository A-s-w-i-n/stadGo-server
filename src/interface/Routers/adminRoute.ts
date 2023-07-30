import { blockOwner, blockUser, fetchOnwerdata, fetchUserdata, unBlockOwner, unBlockUser } from "../Controllers/adminControlls";
import { AdminLoginController } from "../Controllers/adminLoginController";
import { Router } from "express";

const adminRouter = Router()
adminRouter.get('/admin',(req,res)=>{console.log("working");res.json({status:true})})

adminRouter.post('/adminLogin',AdminLoginController)
adminRouter.get('/fetchUser',fetchUserdata)
adminRouter.post('/blockUser',blockUser)
adminRouter.post('/unBlockUser',unBlockUser)

adminRouter.get('/fetchOwner',fetchOnwerdata)
adminRouter.post('/blockOwner', blockOwner)
adminRouter.post('/unBlockOwner',unBlockOwner)
export default adminRouter