import { OTPuser } from "../../../domain/models/user";
import { otpRepository } from "../../../infra/repositories/otpRepository";

export const findOtp = (otpRepo : otpRepository)=>async (email : string,otp :string)=>{
    const Email = email
    const Otp =otp

    
    const   otpFind = await otpRepo.findByOtp(Email,Otp)
    
    
    return otpFind
}