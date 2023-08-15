import mongoose, { Schema, Model, Document } from "mongoose";
import { OTPuser } from "../../domain/models/user";

export type MongoDBOtp = Model<Document & OTPuser>;

const OtpSchema = new Schema({
  Email: {
    type: "string",
    required: true,
  },
  otp: {
    type: "string",
    required: true,
  },
  otpStatus: {
    type: "boolean",
    // required: true,
  },
});

export const OtpModel: MongoDBOtp = mongoose.connection.model<
  Document & OTPuser
>("OTP", OtpSchema);
