import { OTPuser, User } from "../../domain/models/user";
import { MongoDBOtp } from "../database/otp";

export type otpRepository = {
  createOtp: (User: OTPuser) => Promise<OTPuser>;
  findByOtp: (Email: string, otp: string) => Promise<OTPuser | null>;
};

export const otpRepositoryImpl = (otpModel: MongoDBOtp): otpRepository => {

  const createOtp = async (user: OTPuser) => {
    const createUserOtp = await otpModel.create(user);

    return createUserOtp;
  };
  const findByOtp = async (
    Email: string,
    otp: string
  ): Promise<OTPuser | null> => {
    const foundUserOtp = await otpModel.findOne({ $and: [{ Email, otp }] });

    return foundUserOtp;
  };

  return {
    createOtp,
    findByOtp,
  };
};
