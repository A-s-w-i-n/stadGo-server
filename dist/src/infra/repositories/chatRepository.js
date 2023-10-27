"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRepositoryImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bson_1 = require("bson");
const chatRepositoryImpl = (chatModel) => {
    const createChat = (userId, ownerid) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userid = new mongoose_1.default.Types.ObjectId(userId);
            const ownerId = new mongoose_1.default.Types.ObjectId(ownerid);
            const isChat = yield chatModel
                .find({ $and: [{ User: userid }, { Owner: ownerId }] })
                .populate("User", "-password")
                .populate("Owner", "-password")
                .populate("latestMessage");
            if (isChat.length > 0) {
                return isChat;
            }
            else {
                const chatData = {
                    chatName: "sender",
                    User: userid,
                    Owner: ownerId,
                };
                const createdChat = yield chatModel.create(chatData);
                const fullChat = yield chatModel
                    .find({ _id: createdChat._id })
                    .populate("User")
                    .populate("Owner");
                return fullChat;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    });
    const getAllUserChat = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userid = new mongoose_1.default.Types.ObjectId(userId);
            const chats = chatModel
                .find({ User: userid })
                .populate("Owner")
                .populate("latestMessage")
                .sort({ updatedAt: -1 });
            return chats;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
    const getAllOwnersChat = (ownerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ownerid = new mongoose_1.default.Types.ObjectId(ownerId);
            const chats = yield chatModel
                .find({ Owner: ownerid })
                .populate("User", "-password")
                .populate("latestMessage")
                .sort({ updatedAt: -1 });
            return chats;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
    const chatRoomExist = (userId, ownerid) => __awaiter(void 0, void 0, void 0, function* () {
        const userid = new bson_1.ObjectId(userId);
        const ownerId = new bson_1.ObjectId(ownerid);
        const chatExist = yield chatModel.findOne({
            $and: [{ User: userid }, { Owner: ownerId }],
        });
        return chatExist ? chatExist : null;
    });
    return {
        createChat,
        getAllUserChat,
        getAllOwnersChat,
        chatRoomExist,
    };
};
exports.chatRepositoryImpl = chatRepositoryImpl;
