import mongoose, { Model, Schema, Document } from "mongoose";
import { Org } from "../../domain/models/Org";

export type MongoDBOrganization = Model<Document & Org>;

const orgSchema = new Schema<Org>({
  organizationname: {
    type: "string",
    required: true,
  },
  organizationtype: {
    type: "string",
    required: true,
  },
  sportstype: {
    type: "string",
    required: true,
  },
  country: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
});
export const orgModel: MongoDBOrganization = mongoose.connection.model<
  Document & Org
>("organization", orgSchema);
