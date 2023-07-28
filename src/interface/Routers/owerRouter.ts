import { Router } from "express";
import { ownerSignUpController } from "../Controllers/ownerController";
import { ownerLogin } from "../Controllers/ownerLoginController";

const ownerRouter =Router()
ownerRouter.get('/owner',(req,res)=>{console.log("working");res.json({status:true})})
ownerRouter.post('/ownerRegister',ownerSignUpController)
ownerRouter.post('/ownerLogin',ownerLogin)


export default ownerRouter