"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpSend = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: {
        user: "stadgo903@gmail.com",
        pass: "ytfrvacobyhdziov",
    },
});
const otpSend = (email) => {
    const otpEmail = email;
    const otp = Math.floor(10000 + Math.random() * 900000).toString();
    const mailOption = {
        from: "stadgo903@gmail.com",
        to: otpEmail,
        subject: "stadGo verification",
        text: otp + " : stadGo otp verification ",
    };
    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.error("email sending error ", error);
        }
        else {
            console.log("email sent : ", info.response);
        }
    });
    return otp;
};
exports.otpSend = otpSend;
