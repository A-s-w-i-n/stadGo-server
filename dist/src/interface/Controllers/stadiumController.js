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
exports.changeStatus = exports.booked = exports.filterLocation = exports.stadFilter = exports.stadiumEdit = exports.updateVideoUplode = exports.stadiumDetaildView = exports.stadiumList = exports.stadimDataFetch = exports.stadiumController = void 0;
const stadiumModel_1 = require("../../infra/database/stadiumModel");
const stadiumDetails_1 = require("../../app/usecases/stadium/stadiumDetails");
const stadiumRepository_1 = require("../../infra/repositories/stadiumRepository");
const fetchStadiumData_1 = require("../../app/usecases/stadium/fetchStadiumData");
const fetchStadiumList_1 = require("../../app/usecases/stadium/fetchStadiumList");
const filterStadium_1 = require("../../app/usecases/stadium/filterStadium");
const videoUplode_1 = require("../../app/usecases/stadium/videoUplode");
const mongoose_1 = __importDefault(require("mongoose"));
const editStadium_1 = require("../../app/usecases/stadium/editStadium");
const db = stadiumModel_1.stadiumModel;
const stadiumRepository = (0, stadiumRepository_1.stadiumRepositoryImpl)(db);
const stadiumController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stadiumname, maxcapacity, sportstype, fromdate, todate, price, image, discription, location, email, id, } = req.body;
    const newId = new mongoose_1.default.Types.ObjectId(id);
    try {
        const Stadium = (0, stadiumDetails_1.addStadium)(stadiumRepository)(stadiumname, maxcapacity, sportstype, fromdate, todate, price, image, discription, location, email, newId);
        res.status(200).json({ message: "stadium added", Stadium });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.stadiumController = stadiumController;
const stadimDataFetch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const fetchStadiumData = yield (0, fetchStadiumData_1.fetchStadium)(stadiumRepository)(email);
        if (fetchStadiumData) {
            res
                .status(200)
                .json({ sucess: "data fetch successfull", fetchStadiumData });
        }
        else {
            res.json({ falid: "no stadium data" });
        }
    }
    catch (error) {
        res.status(500).json({ message: " internal server eroor" });
    }
});
exports.stadimDataFetch = stadimDataFetch;
const stadiumList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchList = yield (0, fetchStadiumList_1.fetchStadiumList)(stadiumRepository)();
        if (fetchList) {
            res.status(200).json({ success: "data fetch success full", fetchList });
        }
        else {
            res.json({ faild: "no stadium data" });
        }
    }
    catch (_a) {
        res.status(500).json({ error: "intenal server error" });
    }
});
exports.stadiumList = stadiumList;
const stadiumDetaildView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const fetchDetails = yield (0, fetchStadiumList_1.fetchDetaildView)(stadiumRepository)(id);
        if (fetchDetails) {
            res
                .status(200)
                .json({ success: "data fetch successfully", fetchDetails });
        }
        else {
            res.json({ fail: "data fecthing failed" });
        }
    }
    catch (_b) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.stadiumDetaildView = stadiumDetaildView;
const updateVideoUplode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, uplodeVideo } = req.body;
        const uplode = yield (0, videoUplode_1.updateVideo)(stadiumRepository)(id, uplodeVideo);
        if (uplode) {
            res.status(200).json({ success: "video uplode sucess", status: true });
        }
        else {
            res.json({ falied: "video uplode failed" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.updateVideoUplode = updateVideoUplode;
const stadiumEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, stadiumname, sportstype, fromdate, todate, price, discription, } = req.body;
        const edit = yield (0, editStadium_1.editStadiumDetail)(stadiumRepository)(id, stadiumname, sportstype, fromdate, todate, price, discription);
        if (edit) {
            res
                .status(200)
                .json({ success: "stadium details updated successFully", edit });
        }
        else {
            res.json({ failed: "edit update details failed" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.stadiumEdit = stadiumEdit;
const stadFilter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstValue, secondValue } = req.body;
        const filter = yield (0, filterStadium_1.stadiumFilter)(stadiumRepository)(firstValue, secondValue);
        if (filter) {
            res.status(200).json({ message: "success filtering", filter });
        }
        else {
            res.json({ fail: "stadium filter failed" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.stadFilter = stadFilter;
const filterLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { location } = req.body;
        const filter = yield (0, filterStadium_1.locationFilter)(stadiumRepository)(location);
        if (filter) {
            res.status(200).json({ message: "success filtering", filter });
        }
        else {
            res.json({ fail: "filtering falied" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.filterLocation = filterLocation;
const booked = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { booked } = req.body;
        console.log(req.body, "wwwwwwwww");
        const check = yield (0, editStadium_1.checkBooked)(stadiumRepository)(booked);
        if (check) {
            res.status(200).json({ message: "booking is confirmed" });
        }
        else {
            res.json({ fail: "booking failed" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.booked = booked;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        console.log(req.body, "wwwwwwwww");
        const check = yield (0, editStadium_1.changeBooked)(stadiumRepository)(email);
        if (check) {
            res.status(200).json({ message: "Status changed" });
        }
        else {
            res.json({ fail: "booking failed" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.changeStatus = changeStatus;
