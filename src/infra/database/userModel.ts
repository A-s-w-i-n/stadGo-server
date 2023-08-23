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
  },
});

export const userModel: MongoDBUser = mongoose.connection.model<
  Document & User
>("user", userSchema);
