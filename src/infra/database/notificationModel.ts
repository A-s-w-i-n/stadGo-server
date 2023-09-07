import mongoose, { Document, Model, Schema } from "mongoose";
import { notification } from "../../domain/models/notification";

export type MongoDBNotification = Model<Document & notification>;

const notificationSchema = new Schema<notification>({
  msg: {
    type: "string",
    required: true,
  },
  userName: {
    type: "string",
    required: true,
  },
  userId: {
    type: "string",
    required: true,
  },
},{
    timestamps : true
});

export const notificationModel : MongoDBNotification = mongoose.connection.model<Document&notification>("notification",notificationSchema)
