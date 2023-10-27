"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminControlls_1 = require("../Controllers/adminControlls");
const adminLoginController_1 = require("../Controllers/adminLoginController");
const express_1 = require("express");
const adminRouter = (0, express_1.Router)();
adminRouter.get("/admin", (req, res) => {
    console.log("working");
    res.json({ status: true });
});
adminRouter.post("/adminLogin", adminLoginController_1.AdminLoginController);
adminRouter.get("/fetchUser", adminControlls_1.fetchUserdata);
adminRouter.post("/blockUser", adminControlls_1.blockUser);
adminRouter.post("/unBlockUser", adminControlls_1.unBlockUser);
adminRouter.get("/fetchOwner", adminControlls_1.fetchOnwerdata);
adminRouter.post("/blockOwner", adminControlls_1.blockOwner);
adminRouter.post("/unBlockOwner", adminControlls_1.unBlockOwner);
exports.default = adminRouter;
