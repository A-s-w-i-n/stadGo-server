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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkChatExist = exports.findMessageByChatId = exports.sendMessage = exports.fetchOwnerChat = exports.fetchUserChat = exports.accessChat = void 0;
const chatRepository_1 = require("../../infra/repositories/chatRepository");
const chatModel_1 = require("../../infra/database/chatModel");
const accressChat_1 = require("../../app/usecases/chat/accressChat");
const messageModel_1 = require("../../infra/database/messageModel");
const getChats_1 = require("../../app/usecases/chat/getChats");
const getOwnerChats_1 = require("../../app/usecases/chat/getOwnerChats");
const messageRepository_1 = require("../../infra/repositories/messageRepository");
const sendMessage_1 = require("../../app/usecases/chat/sendMessage");
const ownerSendMessage_1 = require("../../app/usecases/chat/ownerSendMessage");
const getMessage_1 = require("../../app/usecases/chat/getMessage");
const chatRoomexist_1 = require("../../app/usecases/chat/chatRoomexist");
const chatDB = chatModel_1.chatModel;
const chatRepository = (0, chatRepository_1.chatRepositoryImpl)(chatDB);
const messageDB = messageModel_1.messageModel;
const messageRepository = (0, messageRepository_1.messageRepositoryImpl)(messageDB);
//  const messageRepository =
const accessChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, ownerid } = req.body;
        const isChat = yield (0, accressChat_1.chatAccess)(chatRepository)(userId, ownerid);
        res.status(200).json({ success: "success", isChat });
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.accessChat = accessChat;
const fetchUserChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.params.userId;
        const allChats = yield (0, getChats_1.getChats)(chatRepository)(userid);
        res.json({ message: " student chat fetch success", allChats });
    }
    catch (error) {
        res.status(500).json({ error: "internal sever error" });
    }
});
exports.fetchUserChat = fetchUserChat;
const fetchOwnerChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ownerid = req.params.ownerId;
        const allChats = yield (0, getOwnerChats_1.getOwnerChats)(chatRepository)(ownerid);
        res.json({ message: "owner chat  fetch success", allChats });
    }
    catch (error) {
        res.json(500).json({ error: "internal server error" });
    }
});
exports.fetchOwnerChat = fetchOwnerChat;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, chatId, currentId, currentRole } = req.body;
        if (currentRole === "user") {
            const user = currentId;
            const msg = yield (0, sendMessage_1.sendingMessage)(messageRepository)(content, chatId, user);
            res.status(200).json({ message: "successs", msg });
        }
        else {
            const owner = currentId;
            const msg = yield (0, ownerSendMessage_1.ownerSendMessage)(messageRepository)(content, chatId, owner);
            res.status(200).json({ message: "success", msg });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.sendMessage = sendMessage;
const findMessageByChatId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatId = req.params.chatId;
        const messages = yield (0, getMessage_1.getAllMessage)(messageRepository)(chatId);
        res.status(200).json({ message: "success", messages });
    }
    catch (error) {
        res.status(500).json({ error: " internal server error" });
    }
});
exports.findMessageByChatId = findMessageByChatId;
const checkChatExist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, ownerid } = req.body;
        const exist = yield (0, chatRoomexist_1.chatExist)(chatRepository)(userId, ownerid);
        res.status(200).json({ messgage: "chat room find success", exist });
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.checkChatExist = checkChatExist;
