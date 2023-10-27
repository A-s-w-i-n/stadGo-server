"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const express_1 = require("express");
const chatController_1 = require("../Controllers/chatController");
exports.chatRouter = (0, express_1.Router)();
exports.chatRouter.post("/accessChat", chatController_1.accessChat);
exports.chatRouter.get("/userChat/:userId", chatController_1.fetchUserChat);
exports.chatRouter.get("/ownerChat/:ownerId", chatController_1.fetchOwnerChat);
exports.chatRouter.post('/chatRoomExist', chatController_1.checkChatExist);
