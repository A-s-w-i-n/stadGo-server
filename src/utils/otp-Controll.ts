import { get } from "mongoose";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "stadgo903@gmail.com",
    pass: "ytfrvacobyhdziov",
  },
});

export const otpSend = (email: string) => {
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
    } else {
      console.log("email sent : ", info.response);
    }
  });
  return otp;
};
