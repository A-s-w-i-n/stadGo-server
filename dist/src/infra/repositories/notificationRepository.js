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
exports.notificationRepositoryImpl = void 0;
const bson_1 = require("bson");
const notificationRepositoryImpl = (notificationModel) => {
    const createNotification = (notification) => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield notificationModel.create(notification);
        return create;
    });
    const updateNotification = (ownerId, Id) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new bson_1.ObjectId(Id);
        const update = yield notificationModel.findOneAndUpdate({ $and: [{ ownerId: ownerId, }, { _id: id }] }, { $set: { request: true } });
        return update ? update : null;
    });
    const UserupdateNotification = (ownerId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const update = yield notificationModel.findOneAndUpdate({ $and: [{ ownerId: ownerId, }, { userId: userId }] }, { $set: { request: false } });
        yield notificationModel.deleteOne({ $and: [{ ownerId: ownerId, }, { userId: userId }] }, { $set: { request: false } });
        return update ? update : null;
    });
    const findOwnerNotification = (ownerId, stadiumId) => __awaiter(void 0, void 0, void 0, function* () {
        const ownerid = new bson_1.ObjectId(ownerId);
        const stadiumid = new bson_1.ObjectId(stadiumId);
        const find = yield notificationModel.find({ $and: [{ stadiumid: stadiumid }, { ownerId: ownerid }] });
        return find ? find : null;
    });
    const findUserNotifications = (ownerId, stadiumId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const find = yield notificationModel.findOne({ $and: [{ ownerId: ownerId }, { stadiumid: stadiumId }, { userId: userId }] });
        return find ? find : null;
    });
    return {
        createNotification,
        updateNotification,
        findOwnerNotification,
        findUserNotifications,
        UserupdateNotification
    };
};
exports.notificationRepositoryImpl = notificationRepositoryImpl;
