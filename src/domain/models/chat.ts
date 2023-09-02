import mongoose from "mongoose";
import { User } from "./user";
import { Owner } from "./owner";

export interface Chat {
  chatName: string;
  User?: mongoose.Types.ObjectId;
  Owner?: mongoose.Types.ObjectId;
  latestMessage?: mongoose.Types.ObjectId;
}

export interface message {
  User?: mongoose.Types.ObjectId;
  Owner?: mongoose.Types.ObjectId;
  content: string;
  chat: mongoose.Types.ObjectId;
}

export interface newMessageReceived {
  _id: string;
  User?: User;
  Owner?: Owner;
  content: string;
  chat: ChatInMessage;
}

export interface ChatInMessage {
  _id: string;
  Owner: Owner;
  User: User;
}
