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
exports.unBlockOwner = exports.blockOwner = exports.fetchOnwerdata = exports.unBlockUser = exports.blockUser = exports.fetchUserdata = void 0;
const userModel_1 = require("../../infra/database/userModel");
const adminHandle_1 = require("../../app/usecases/admin/adminHandle");
const userRepositories_1 = require("../../infra/repositories/userRepositories");
const ownerModel_1 = require("../../infra/database/ownerModel");
const ownerRepositories_1 = require("../../infra/repositories/ownerRepositories");
const db = userModel_1.userModel;
const ownerDB = ownerModel_1.ownerModel;
// import ad
const userRepo = (0, userRepositories_1.UserRepositoryImpl)(db);
const ownerRepo = (0, ownerRepositories_1.OwnerRepositoryImpl)(ownerDB);
const fetchUserdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersFetch = yield (0, adminHandle_1.fetchUsers)(userRepo)();
        if (usersFetch) {
            res.status(200).json({ success: "data fetch successfull ", usersFetch });
        }
        else {
            res.json({ faild: "no student data" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.fetchUserdata = fetchUserdata;
const blockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const userBlocked = yield (0, adminHandle_1.userBlock)(userRepo)(id);
        if (userBlocked) {
            res.status(200).json({ message: "user blocked " });
        }
        else {
            res.json({ message: "user block faild" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.blockUser = blockUser;
const unBlockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const userUnBlocked = yield (0, adminHandle_1.userUnblock)(userRepo)(id);
        if (userUnBlocked) {
            res.status(200).json({ message: "user blocked " });
        }
        else {
            res.json({ failmessage: "user unblock faild" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.unBlockUser = unBlockUser;
const fetchOnwerdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ownerFetch = yield (0, adminHandle_1.fetchOwner)(ownerRepo)();
        if (ownerFetch) {
            res.status(200).json({ success: "onwer data found", ownerFetch });
        }
        else {
            res.json({ message: "owner data is not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.fetchOnwerdata = fetchOnwerdata;
const blockOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const ownerBlocked = yield (0, adminHandle_1.ownerBlock)(ownerRepo)(id);
        if (ownerBlocked) {
            res.status(200).json({ message: "user blocked " });
        }
        else {
            res.json({ messge: " owner block faild" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.blockOwner = blockOwner;
const unBlockOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const ownerUnBlocked = yield (0, adminHandle_1.ownerUnblock)(ownerRepo)(id);
        if (ownerUnBlocked) {
            res.status(200).json({ message: "owner blocked " });
        }
        else {
            res.json({ mesage: "owner block faild" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.unBlockOwner = unBlockOwner;
