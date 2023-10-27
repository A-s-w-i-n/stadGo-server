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
exports.changedpassword = exports.findProfileImg = exports.updateImageControll = exports.userSignController = void 0;
const userModel_1 = require("../../infra/database/userModel");
const userRepositories_1 = require("../../infra/repositories/userRepositories");
const signupUser_1 = require("../../app/usecases/user/signupUser");
const loginUser_1 = require("../../app/usecases/user/loginUser");
const profileImg_1 = require("../../app/usecases/user/profileImg");
const updatePassword_1 = require("../../app/usecases/user/updatePassword");
const db = userModel_1.userModel;
const userRepository = (0, userRepositories_1.UserRepositoryImpl)(db);
const userSignController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, username, email, phone, password, isGoogle } = req.body;
    const premium = false;
    const isblocked = false;
    const role = "user";
    try {
        const Guser = yield (0, loginUser_1.login)(userRepository)(email, password);
        if (Guser == null) {
            const user = yield (0, signupUser_1.signupUser)(userRepository)(firstname, lastname, username, email, password, isblocked, premium, phone, isGoogle, role);
            res.status(201).json({ message: "data found", user });
        }
        else if (isGoogle == true) {
            res.status(201).json({ message: "data founded ", Guser });
        }
        else {
            res.json({ message: "data is not found" });
        }
    }
    catch (_a) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.userSignController = userSignController;
const updateImageControll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, url } = req.body;
        const uplodeImg = yield (0, profileImg_1.userUpdateImg)(userRepository)(id, url);
        if (uplodeImg) {
            res.status(200).json({ succes: " profile image  uplode success", uplodeImg });
        }
        else {
            res.json({ faile: "profile image uplode fail" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.updateImageControll = updateImageControll;
const findProfileImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const findImg = yield (0, profileImg_1.fecthUserImage)(userRepository)(id);
        if (findImg) {
            res.status(200).json({ message: "image fetch success", findImg });
        }
        else {
            res.json("image fetch faild");
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.findProfileImg = findProfileImg;
const changedpassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, changedpassword } = req.body;
        const change = yield (0, updatePassword_1.upadatePassword)(userRepository)(email, changedpassword);
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
exports.changedpassword = changedpassword;
