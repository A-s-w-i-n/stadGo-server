import mongoose, { Schema, Document, Model } from "mongoose";
import { type } from "os";
import { admin } from "../../domain/models/admin";

export type MongoDBAdmin = Model<Document & admin>;

const adminSchema = new Schema<admin>({
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
});
export const adminModel: MongoDBAdmin = mongoose.connection.model<
  Document & admin
>("admin", adminSchema);
