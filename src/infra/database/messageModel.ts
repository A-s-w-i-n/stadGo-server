import mongoose, { Document, Model, Schema } from "mongoose";
import { message } from "../../domain/models/chat";

export type MongoDBMessage = Model<Document & message>;

const messageSchema = new Schema<message>(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
    },
    content: {
      type: "string",
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    }, 
  },
  {
    timestamps: true,
  } 
);

export const messageModel: MongoDBMessage = mongoose.connection.model<
  Document & message
>("message", messageSchema);
 