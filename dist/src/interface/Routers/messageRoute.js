"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = require("express");
const chatController_1 = require("../Controllers/chatController");
exports.messageRouter = (0, express_1.Router)();
exports.messageRouter.post("/send", chatController_1.sendMessage);
exports.messageRouter.get("/:chatId", chatController_1.findMessageByChatId);
