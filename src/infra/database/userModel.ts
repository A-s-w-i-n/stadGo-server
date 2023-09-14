import mongoose, { Model, Schema, Document } from "mongoose";
import { User } from "../../domain/models/user";

export type MongoDBUser = Model<Document & User>;

const userSchema = new Schema<User>({
  firstname: {
    type: "string",
    required: true,
  },
  lastname: {
    type: "string",
    required: true,
  },
  username: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  phone: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },

  isblocked: {
    type: "boolean",
    default: false,
  },
  premium: {
    type: "boolean",
    default: false,
  },
  isGoogle: {
    type: "boolean",
    default: false,
  },
  role: {
    type: "string",
    default: "user",
  },
  profileImg: {
    type: "string",
    default : "https://o.remove.bg/downloads/f1b14daf-e2c0-4c71-bc8e-e4af56c9cdbf/profile_default_img-removebg-preview.png"
  },
  paymentDetails: [{
    orderId: {
      type: String,
      required: true,
    },
    stadiumId: {
      type: String,
      required: true,
    },
  }]  
});

export const userModel: MongoDBUser = mongoose.connection.model<
  Document & User
>("User", userSchema);
