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
exports.AdminLoginController = void 0;
const adminModel_1 = require("../../infra/database/adminModel");
const adminRepository_1 = require("../../infra/repositories/adminRepository");
const jwtAuthentication_1 = require("../../utils/jwtAuthentication");
const adminLogin_1 = require("../../app/usecases/admin/adminLogin");
const db = adminModel_1.adminModel;
const adminRepo = (0, adminRepository_1.adminRepositoryimpl)(db);
const AdminLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const adminLoginCheck = yield (0, adminLogin_1.adminLogin)(adminRepo)(email, password);
        if (adminLoginCheck) {
            const { _id, email } = JSON.parse(JSON.stringify(adminLoginCheck));
            const accessToken = (0, jwtAuthentication_1.generateAccessToken)(_id, email);
            res.status(200).json({
                message: "admin login successfull",
                adminLoginCheck,
                accessToken,
            });
        }
        else {
            res.json({ message: "admin login fail" });
        }
    }
    catch (error) {
        res.status(500).json({ message: " internal server error" });
    }
});
exports.AdminLoginController = AdminLoginController;
