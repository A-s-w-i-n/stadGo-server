import { Request,Response } from "express";
import { otpSend } from "../../utils/otp-Controll";
import { OtpModel } from "../../infra/database/otp";
import { otpRepositoryImpl } from "../../infra/repositories/otpRepository";
import { otpRegister } from "../../app/usecases/user/otpRegister";

const otpDB = OtpModel
const otpRepo = otpRepositoryImpl(otpDB)

export const otpAuthContoller = async(req:Request,res:Response  )=>{
    const {email}  = req.body
    try {
        const otp = otpSend(email)
        const sentOtp = otp.toString()

        const insertedOtp = await otpRegister(otpRepo)(email,sentOtp)
        res.status(200).json({success:"otp created successfull",status : true})
    } catch (error) {
        res.status(500).json({error : "internal server error"})
    }
}