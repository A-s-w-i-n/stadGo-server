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
exports.forgotPassword = exports.otpAuthContoller = void 0;
const otp_Controll_1 = require("../../utils/otp-Controll");
const otp_1 = require("../../infra/database/otp");
const otpRepository_1 = require("../../infra/repositories/otpRepository");
const otpRegister_1 = require("../../app/usecases/user/otpRegister");
const fetchUser_1 = require("../../app/usecases/user/fetchUser");
const userRepositories_1 = require("../../infra/repositories/userRepositories");
const userModel_1 = require("../../infra/database/userModel");
const otpDB = otp_1.OtpModel;
const userDB = userModel_1.userModel;
const otpRepo = (0, otpRepository_1.otpRepositoryImpl)(otpDB);
const userReop = (0, userRepositories_1.UserRepositoryImpl)(userDB);
const otpAuthContoller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const otp = (0, otp_Controll_1.otpSend)(email);
        const sentOtp = otp.toString();
        const insertedOtp = yield (0, otpRegister_1.otpRegister)(otpRepo)(email, sentOtp);
        res.status(200).json({ success: "otp created successfull", status: true });
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.otpAuthContoller = otpAuthContoller;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    console.log(req.body, "lllll");
    try {
        const password = yield (0, fetchUser_1.fetchUsers)(userReop)(email);
        console.log(password, "fdfd");
        if (password) {
            const otp = (0, otp_Controll_1.otpSend)(email);
            const sentOtp = otp.toString();
            const insertedOtp = yield (0, otpRegister_1.otpRegister)(otpRepo)(email, sentOtp);
            res.status(200).json({ success: "otp created successfull", status: true });
        }
        else {
            res.json({ error: "You are not registered with us. Please sign up" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.forgotPassword = forgotPassword;
