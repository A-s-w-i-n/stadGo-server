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
exports.OwnerRepositoryImpl = void 0;
const ownerModel_1 = require("../database/ownerModel");
const bson_1 = require("bson");
const OwnerRepositoryImpl = (OwnerModel) => {
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const owner = yield OwnerModel.findOne({ email });
        return owner ? owner.toObject() : null;
    });
    const create = (owner) => __awaiter(void 0, void 0, void 0, function* () {
        const createOwner = yield OwnerModel.create(owner);
        return createOwner.toObject();
    });
    const findOwner = () => __awaiter(void 0, void 0, void 0, function* () {
        const adminOwnerFetch = yield OwnerModel.find();
        return adminOwnerFetch;
    });
    const blockOwners = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield OwnerModel.updateOne({ _id: id }, { $set: { isblocked: true } });
        if (result.matchedCount > 0) {
            return result;
        }
    });
    const unblcokowner = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield ownerModel_1.ownerModel.updateOne({ _id: id }, { $set: { isblocked: false } });
        if (result.matchedCount > 0) {
            return result;
        }
    });
    const updatePremium = (stadiumId, orderId, ownerId, userId, stadiumPrice, date, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
        const objectId = new bson_1.ObjectId(ownerId);
        const result = yield ownerModel_1.ownerModel.updateOne({ _id: objectId }, { $push: { paymentDetails: { orderId: orderId, stadiumId: stadiumId, userId: userId, stadiumPrice: stadiumPrice, date: date, startDate: startDate, endDate: endDate } } });
        if (result.matchedCount > 0) {
            return result;
        }
    });
    const ownerFetch = (email, item) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const page = item;
        const pageSize = 5;
        const skipCount = (page - 1) * pageSize;
        console.log(skipCount, "5555");
        const result = yield ownerModel_1.ownerModel.find({ email: email }).populate("User");
        const modifiedOwners = result.map((owner) => {
            if (owner.User && owner.User.length > 0) {
                owner.User = owner.User.slice(skipCount, skipCount + pageSize);
            }
            return owner;
        });
        const userCount = (_a = result[0].User) === null || _a === void 0 ? void 0 : _a.length;
        console.log(userCount);
        const totalCount = Math.ceil(userCount / pageSize);
        console.log(totalCount);
        return { modifiedOwners, totalCount };
    });
    const ownerFetchById = (ownerid) => __awaiter(void 0, void 0, void 0, function* () {
        const objectid = new bson_1.ObjectId(ownerid);
        const result = yield ownerModel_1.ownerModel.find({ _id: objectid });
        return result ? result : null;
    });
    const userInfo = (userId, ownerid) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield ownerModel_1.ownerModel.updateMany({ _id: ownerid }, { $addToSet: { User: userId } });
        return result ? result : null;
    });
    const userList = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const objectId = new bson_1.ObjectId(id);
        const result = yield ownerModel_1.ownerModel.find({ _id: objectId });
        return result ? result : null;
    });
    const changePassword = (email, changedpassword) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield ownerModel_1.ownerModel.updateOne({ email: email }, { $set: { password: changedpassword } });
        return result ? result : null;
    });
    return {
        findByEmail,
        create,
        findOwner,
        blockOwners,
        unblcokowner,
        updatePremium,
        ownerFetch,
        userInfo,
        userList,
        ownerFetchById,
        changePassword
    };
};
exports.OwnerRepositoryImpl = OwnerRepositoryImpl;
