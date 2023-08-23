import mongoose, { Model, Schema, Document } from "mongoose";
import { stadium } from "../../domain/models/stadium";

export type MongoDBStadium = Model<Document & stadium>;

const stadiumSchema = new Schema<stadium>({
  stadiumname: {
    type: "string",
    required: true,
  },
  maxcapacity: {
    type: "string",
    required: true,
  },
  sportstype: {
    type: "string",
    required: true,
  },
  fromdate: {
    type: "string",
    required: true,
  },
  todate: {
    type: "string",
    required: true,
  },
  price: {
    type: "string",
    required: true,
  },
  image: {
    type: ["string"],
    required: true,
  },
  discription: {
    type: "string",
    required: true,
  },
  location: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
  },
  video: {
    type: "string",
  },
  id: {
    type: mongoose.Types.ObjectId,
  },
});
export const stadiumModel: MongoDBStadium = mongoose.connection.model<
  Document & stadium
>("stadium", stadiumSchema);
