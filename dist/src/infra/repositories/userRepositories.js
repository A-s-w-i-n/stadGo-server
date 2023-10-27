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
exports.UserRepositoryImpl = void 0;
const userModel_1 = require("../database/userModel");
const bson_1 = require("bson");
const UserRepositoryImpl = (UserModel) => {
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield UserModel.findOne({ email });
        return user ? user.toObject() : null;
    });
    const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield UserModel.create(user);
        return createUser.toObject();
    });
    const findUser = () => __awaiter(void 0, void 0, void 0, function* () {
        const adminUsersFetch = yield UserModel.find();
        return adminUsersFetch;
    });
    const blockUsers = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userModel_1.userModel.updateOne({ _id: id }, { $set: { isblocked: true } });
        if (result.matchedCount > 0) {
            return result;
        }
    });
    const unblcokuser = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userModel_1.userModel.updateOne({ _id: id }, { $set: { isblocked: false } });
        if (result.matchedCount > 0) {
            return result;
        }
    });
    const updatePremium = (stadiumId, orderId, email, stadiumPrice, userId, date, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userModel_1.userModel.updateOne({ email: email }, { $push: { paymentDetails: { orderId: orderId, stadiumId: stadiumId, stadiumPrice: stadiumPrice, userId: userId, date: date, startDate: startDate, endDate: endDate } } });
        return result;
    });
    const userFetch = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userModel_1.userModel.findOne({ email });
        return result ? result : null;
    });
    const updataProfile = (id, url) => __awaiter(void 0, void 0, void 0, function* () {
        const objectId = new bson_1.ObjectId(id);
        const result = yield userModel_1.userModel.findOneAndUpdate({ _id: objectId }, { $set: { profileImg: url } });
        if (result) {
            return result;
        }
    });
    const findProfileImg = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const objectId = new bson_1.ObjectId(id);
        const result = yield userModel_1.userModel.findOne({ _id: objectId });
        return result;
    });
    const changePassword = (email, changedpassword) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userModel_1.userModel.updateOne({ email: email }, { $set: { password: changedpassword } });
        return result ? result : null;
    });
    return {
        findByEmail,
        create,
        findUser,
        blockUsers,
        unblcokuser,
        updatePremium,
        userFetch,
        updataProfile,
        findProfileImg,
        changePassword
    };
};
exports.UserRepositoryImpl = UserRepositoryImpl;
