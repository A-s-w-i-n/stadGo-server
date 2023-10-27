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
exports.stadiumRepositoryImpl = void 0;
const bson_1 = require("bson");
const stadiumRepositoryImpl = (stadiumModel) => {
    const create = (stadium) => __awaiter(void 0, void 0, void 0, function* () {
        const addStadium = yield stadiumModel.create(stadium);
        return addStadium;
    });
    const findStadiumByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const fetchStadiumData = yield stadiumModel.find({ email });
        return fetchStadiumData ? fetchStadiumData : null;
    });
    const findStadiumList = () => __awaiter(void 0, void 0, void 0, function* () {
        const stadiumList = yield stadiumModel.find();
        return stadiumList;
    });
    const findStadiumById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const objectID = new bson_1.ObjectId(id);
        const detaildView = yield stadiumModel.findOne({ _id: objectID });
        return detaildView;
    });
    const uplodeVideo = (id, uplodeVideo) => __awaiter(void 0, void 0, void 0, function* () {
        const objectID = new bson_1.ObjectId(id);
        const videoUplodes = yield stadiumModel.updateOne({ _id: objectID }, { $set: { video: uplodeVideo } });
        if (videoUplodes.modifiedCount > 0) {
            return videoUplodes;
        }
    });
    const editStadium = (id, stadiumname, sportstype, fromdate, todate, price, discription) => __awaiter(void 0, void 0, void 0, function* () {
        const objectID = new bson_1.ObjectId(id);
        const result = yield stadiumModel.findOneAndUpdate({ _id: objectID }, {
            $set: { stadiumname, sportstype, fromdate, todate, price, discription },
        });
        return result;
    });
    const filterStadium = (firstValue, secondValue) => __awaiter(void 0, void 0, void 0, function* () {
        const filter = yield stadiumModel.find({
            $and: [{ maxcapacity: { $gte: firstValue, $lte: secondValue } }],
        });
        return filter;
    });
    const filterLocation = (location) => __awaiter(void 0, void 0, void 0, function* () {
        const filter = yield stadiumModel.find({ location: location });
        return filter;
    });
    const bookedCheck = (booked) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new bson_1.ObjectId(booked);
        const check = yield stadiumModel.updateOne({ _id: id }, { $set: { isBooked: true } });
        return check ? check : null;
    });
    const updateStatus = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const check = yield stadiumModel.updateOne({ email: email }, { $set: { isBooked: false } });
        return check ? check : null;
    });
    return {
        create,
        findStadiumByEmail,
        findStadiumList,
        findStadiumById,
        uplodeVideo,
        editStadium,
        filterStadium,
        filterLocation,
        bookedCheck,
        updateStatus
    };
};
exports.stadiumRepositoryImpl = stadiumRepositoryImpl;
