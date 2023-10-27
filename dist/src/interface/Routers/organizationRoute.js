"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const organizationController_1 = require("../Controllers/organizationController,");
// import verifyToken from "../Middleware/middleware";
const orgRouter = (0, express_1.Router)();
orgRouter.post("/orgDetails", organizationController_1.orgDetailsController);
orgRouter.post("/fetchOrg", organizationController_1.fetchOrgController);
exports.default = orgRouter;
