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
exports.fetchOrgController = exports.orgDetailsController = void 0;
const organizationModel_1 = require("../../infra/database/organizationModel");
const orgDetails_1 = require("../../app/usecases/organization/orgDetails");
const organizatoinRepository_1 = require("../../infra/repositories/organizatoinRepository");
const orgFetch_1 = require("../../app/usecases/organization/orgFetch");
const db = organizationModel_1.orgModel;
const orgRepository = (0, organizatoinRepository_1.orgRepositroryImpl)(db);
const orgDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { organizationname, organizationtype, sportstype, country, email } = req.body;
    try {
        const Organization = (0, orgDetails_1.createOrg)(orgRepository)(organizationname, organizationtype, sportstype, country, email);
        res.status(200).json({ message: "data found", Organization });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.orgDetailsController = orgDetailsController;
const fetchOrgController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const fetchOrg = yield (0, orgFetch_1.findOrg)(orgRepository)(email);
        res
            .status(200)
            .json({ success: "organization data fecth successfull", fetchOrg });
    }
    catch (error) { }
});
exports.fetchOrgController = fetchOrgController;
