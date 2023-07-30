import mongoose, { Model, Schema, Document } from "mongoose";
import { Owner } from "../../domain/models/owner";

export type MongoDBOwner = Model<Document & Owner>;

const ownerSchema = new Schema<Owner>({
  firstname: {
    type: "string",
    required: true,
  },
  lastname: {
    type: "string",
    required: true,
  },
  ownername: {
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
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
  location: {
    type: "string",
    required: true,
  },
  companyname: {
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
  // profileImg : {
  //     type : 'string',
  // }
});

export const ownerModel: MongoDBOwner = mongoose.connection.model<
  Document & Owner
>("owner", ownerSchema);
