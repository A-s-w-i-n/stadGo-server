import { Request, Response, Router } from "express";
import { userSignController } from "../Controllers/userController";
import { Login } from "../Controllers/userLoginController";


const userRouter = Router()

userRouter.get('/',(req,res)=>{console.log("working");res.json({status:true})})

userRouter.post('/userRegister',userSignController)

userRouter.post('/login',Login)

export default userRouter;
