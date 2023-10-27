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
exports.messageRepositoryImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chatModel_1 = require("../database/chatModel");
const messageRepositoryImpl = (messageModel) => {
    const sendMessage = (content, chatId, user) => __awaiter(void 0, void 0, void 0, function* () {
        const newChat = {
            User: new mongoose_1.default.Types.ObjectId(user),
            content,
            chat: new mongoose_1.default.Types.ObjectId(chatId),
        };
        let message = yield messageModel.create(newChat);
        message = yield message.populate('User', '_id firstname lastname username ');
        message = yield message.populate('Owner', '_id firstname lastname ownername');
        message = yield message.populate('chat');
        message = yield message.populate('chat.User');
        message = yield message.populate('chat.Owner');
        yield chatModel_1.chatModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(chatId) }, { $set: { latestMessage: message } });
        return message;
    });
    const ownerSendMessage = (content, chatId, owner) => __awaiter(void 0, void 0, void 0, function* () {
        const newChat = {
            Owner: new mongoose_1.default.Types.ObjectId(owner),
            content,
            chat: new mongoose_1.default.Types.ObjectId(chatId),
        };
        let message = yield messageModel.create(newChat);
        message = yield message.populate('User', '_id firstname lastname username ');
        message = yield message.populate('Owner', '_id firstname lastname ownername');
        message = yield message.populate('chat');
        message = yield message.populate('chat.User');
        message = yield message.populate('chat.Owner');
        return message;
    });
    const findMessageByChatId = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        const message = yield messageModel.find({
            chat: new mongoose_1.default.Types.ObjectId(chatId),
        }).
            populate('User', 'firstname lastname username').populate('Owner', 'firstname lastname ownername').populate('chat');
        return message;
    });
    return {
        sendMessage,
        ownerSendMessage,
        findMessageByChatId,
    };
};
exports.messageRepositoryImpl = messageRepositoryImpl;
