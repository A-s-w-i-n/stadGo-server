import mongoose, { Document, Model, Schema } from "mongoose";
import { Chat } from "../../domain/models/chat";

export type MongoDBChat = Model<Document & Chat>;

const chatSchema = new Schema<Chat>(
  {
    chatName: {
      type: "string",
      required: true,
    },
    User: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    Owner: {
      type: mongoose.Types.ObjectId,
      ref: "owner",
    },
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: "message",
    },
  },
  {
    timestamps: true,
  }
);

export const chatModel: MongoDBChat = mongoose.connection.model<
  Document & Chat
>("chat", chatSchema);
