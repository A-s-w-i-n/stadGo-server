"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ownerController_1 = require("../Controllers/ownerController");
const ownerLoginController_1 = require("../Controllers/ownerLoginController");
const paymentController_1 = require("../Controllers/paymentController");
const ownerFetchController_1 = require("../Controllers/ownerFetchController");
const stadiumController_1 = require("../Controllers/stadiumController");
const userAuth_1 = __importDefault(require("../Middleware/userAuth"));
const ownerAuth_1 = __importDefault(require("../Middleware/ownerAuth"));
// import { createPaymentIntent } from "../Controllers/onwerPremiumController";
const ownerRouter = (0, express_1.Router)();
ownerRouter.get("/owner", (req, res) => {
    console.log("working");
    res.json({ status: true });
});
ownerRouter.post("/ownerRegister", ownerController_1.ownerSignUpController);
ownerRouter.post("/ownerLogin", ownerLoginController_1.ownerLogin);
ownerRouter.post("/ownerPayment", paymentController_1.premiumController);
ownerRouter.post("/fetchOwner", ownerFetchController_1.fetchOnwer);
ownerRouter.post('/fetchOwnerById', ownerFetchController_1.fetchOwnerByid);
ownerRouter.post("/videoUplode", ownerAuth_1.default, stadiumController_1.updateVideoUplode);
ownerRouter.post('/userList', userAuth_1.default, ownerFetchController_1.userinfo);
ownerRouter.post('/userListFetch', ownerFetchController_1.listUser);
ownerRouter.post("/ownerUpdatePassword", ownerFetchController_1.Ownerchangedpassword);
exports.default = ownerRouter;
