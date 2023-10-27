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
exports.findUserNotification = exports.UserupdateStatus = exports.updateStatus = exports.findOnwerNotifications = exports.createNotifications = void 0;
const notificationModel_1 = require("../../infra/database/notificationModel");
const notificationRepository_1 = require("../../infra/repositories/notificationRepository");
const createNotification_1 = require("../../app/usecases/notification/createNotification");
const findNotification_1 = require("../../app/usecases/notification/findNotification");
const updateNotification_1 = require("../../app/usecases/notification/updateNotification");
const db = notificationModel_1.notificationModel;
const notificationRepo = (0, notificationRepository_1.notificationRepositoryImpl)(db);
const createNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, ownerId, username, stadiumid } = req.body;
    const request = false;
    try {
        const create = (0, createNotification_1.createNotification)(notificationRepo)(userId, ownerId, stadiumid, username, request);
        res.status(200).json({ message: "notification created", create });
    }
    catch (error) {
        res.json(500).json({ message: "internal server" });
    }
});
exports.createNotifications = createNotifications;
const findOnwerNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownerId, stadiumId } = req.body;
    try {
        const findNotification = yield (0, findNotification_1.ownerFindNotification)(notificationRepo)(ownerId, stadiumId);
        res
            .status(200)
            .json({ message: "notification fetched succesfull", findNotification });
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.findOnwerNotifications = findOnwerNotifications;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownerId, Id } = req.body;
    try {
        const update = yield (0, updateNotification_1.updateNotificationStatus)(notificationRepo)(ownerId, Id);
        res.status(200).json({ message: "update successfull ", update });
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.updateStatus = updateStatus;
const UserupdateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownerId, userId } = req.body;
    try {
        const update = yield (0, updateNotification_1.UserupdateNotification)(notificationRepo)(ownerId, userId);
        res.status(200).json({ message: "update successfull ", update });
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.UserupdateStatus = UserupdateStatus;
const findUserNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownerId, stadiumid, userId } = req.body;
    try {
        const find = yield (0, findNotification_1.userFindNotification)(notificationRepo)(ownerId, stadiumid, userId);
        res.status(200).json({ message: "notification find succesfull", find });
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.findUserNotification = findUserNotification;
