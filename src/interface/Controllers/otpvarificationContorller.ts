import { Request, Response } from "express";
import { OtpModel } from "../../infra/database/otp";
import { otpRepositoryImpl } from "../../infra/repositories/otpRepository";
import { otpRegister } from "../../app/usecases/user/otpRegister";
import { findOtp } from "../../app/usecases/user/otpVerification";

const otpDB = OtpModel;
const otpUserRepo = otpRepositoryImpl(otpDB);

export const otpVerification = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const storeOtp = await findOtp(otpUserRepo)(email, otp);

    if (storeOtp) {
      if (storeOtp?.otp === otp) {
        res.status(200).json({ success: "Register completed" });
      } else {
        res.json({ fail: "Register is not completed" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "intneral server error" });
  }
};
