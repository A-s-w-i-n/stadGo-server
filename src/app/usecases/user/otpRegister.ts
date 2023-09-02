import { OTPuser } from "../../../domain/models/user";
import { otpRepository } from "../../../infra/repositories/otpRepository";

export const otpRegister =
  (otpRepo: otpRepository) => async (Email: string, otp: string) => {
    const newOtp: OTPuser = {
      Email,
      otp,
    };

    const createUserOtp = await otpRepo.createOtp(newOtp);

    return createUserOtp;
  };
