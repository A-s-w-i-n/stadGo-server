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
exports.otpVerification = void 0;
const otp_1 = require("../../infra/database/otp");
const otpRepository_1 = require("../../infra/repositories/otpRepository");
const otpVerification_1 = require("../../app/usecases/user/otpVerification");
const otpDB = otp_1.OtpModel;
const otpUserRepo = (0, otpRepository_1.otpRepositoryImpl)(otpDB);
const otpVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        const storeOtp = yield (0, otpVerification_1.findOtp)(otpUserRepo)(email, otp);
        if (storeOtp) {
            if ((storeOtp === null || storeOtp === void 0 ? void 0 : storeOtp.otp) === otp) {
                res.status(200).json({ success: "Register completed" });
            }
            else {
                res.json({ fail: "Register is not completed" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: "intneral server error" });
    }
});
exports.otpVerification = otpVerification;
