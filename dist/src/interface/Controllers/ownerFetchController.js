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
exports.Ownerchangedpassword = exports.listUser = exports.userinfo = exports.fetchOwnerByid = exports.fetchOnwer = void 0;
const ownerModel_1 = require("../../infra/database/ownerModel");
const fetchOwner_1 = require("../../app/usecases/Owner/fetchOwner");
const ownerRepositories_1 = require("../../infra/repositories/ownerRepositories");
const userList_1 = require("../../app/usecases/Owner/userList");
const passwordUpdate_1 = require("../../app/usecases/Owner/passwordUpdate");
const db = ownerModel_1.ownerModel;
const ownerRepo = (0, ownerRepositories_1.OwnerRepositoryImpl)(db);
const fetchOnwer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, item } = req.body;
        const ownerDetail = yield (0, fetchOwner_1.fetchOwners)(ownerRepo)(email, item);
        if (ownerDetail) {
            res
                .status(200)
                .json({ message: "data fetched successfully", ownerDetail });
        }
        else {
            res.json({ failed: "data fetch failed" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server errror" });
    }
});
exports.fetchOnwer = fetchOnwer;
const fetchOwnerByid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerid } = req.body;
        const fetch = yield (0, fetchOwner_1.fetchOwnerById)(ownerRepo)(ownerid);
        if (fetch) {
            res.status(200).json({ message: "fetch success", fetch });
        }
        else {
            res.json({ fail: "fetch failed" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.fetchOwnerByid = fetchOwnerByid;
const userinfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, ownerid } = req.body;
        // console.log(req.body,"details");
        const listUser = yield (0, userList_1.userDetails)(ownerRepo)(userId, ownerid);
        if (listUser) {
            res.status(200).json({ message: "userList added success", listUser });
        }
        else {
            res.json({ fali: "userList add failed" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.userinfo = userinfo;
const listUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const userLists = yield (0, userList_1.userList)(ownerRepo)(id);
        if (userLists) {
            res.status(200).json({ message: "owner userList fectched" });
        }
        else {
            res.json({ fali: " owner userLIst fetch failed" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.listUser = listUser;
const Ownerchangedpassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, changedpassword } = req.body;
        const change = yield (0, passwordUpdate_1.OwnerupadatePassword)(ownerRepo)(email, changedpassword);
        if (change) {
            res.status(200).json({ message: "password updated", change });
        }
        else {
            res.json("password is not updated");
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.Ownerchangedpassword = Ownerchangedpassword;
