import { Request, Response } from "express";
import { otpSend } from "../../utils/otp-Controll";
import { OtpModel } from "../../infra/database/otp";
import { otpRepositoryImpl } from "../../infra/repositories/otpRepository";
import { otpRegister } from "../../app/usecases/user/otpRegister";
import { fetchUsers } from "../../app/usecases/user/fetchUser";
import { UserRepositoryImpl } from "../../infra/repositories/userRepositories";
import { userModel } from "../../infra/database/userModel";

const otpDB = OtpModel;
const userDB = userModel
const otpRepo = otpRepositoryImpl(otpDB);
const userReop = UserRepositoryImpl(userDB)
export const otpAuthContoller = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const otp = otpSend(email);
    const sentOtp = otp.toString();

    const insertedOtp = await otpRegister(otpRepo)(email, sentOtp);
    res.status(200).json({ success: "otp created successfull", status: true });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
export const forgotPassword = async(req : Request,res :Response)=>{
   const {email} = req.body
   console.log(req.body,"lllll");
   
   try {
    const password =await fetchUsers(userReop)(email)
    console.log(password,"fdfd");
    
    if( password){
      const otp = otpSend(email);
      const sentOtp = otp.toString();
  
      const insertedOtp = await otpRegister(otpRepo)(email, sentOtp);
      res.status(200).json({ success: "otp created successfull", status: true });

    }else{
     res.json({error :"You are not registered with us. Please sign up"})
    }
   } catch (error) {
    
    res.status(500).json({error :"internal server error"})
   }
}
