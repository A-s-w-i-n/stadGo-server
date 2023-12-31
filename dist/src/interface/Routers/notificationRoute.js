"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationController_1 = require("../Controllers/notificationController");
const notificationRouter = (0, express_1.Router)();
notificationRouter.post('/create', notificationController_1.createNotifications);
notificationRouter.post('/ownerNotification', notificationController_1.findOnwerNotifications);
notificationRouter.post('/updateStatus', notificationController_1.updateStatus);
notificationRouter.post('/updateStatusByUser', notificationController_1.UserupdateStatus);
notificationRouter.post('/userNotification', notificationController_1.findUserNotification);
exports.default = notificationRouter;
