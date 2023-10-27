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
exports.userPremiumController = exports.premiumController = void 0;
const ownerModel_1 = require("../../infra/database/ownerModel");
const ownerRepositories_1 = require("../../infra/repositories/ownerRepositories");
const ownerPremium_1 = require("../../app/usecases/payment/ownerPremium");
const userModel_1 = require("../../infra/database/userModel");
const userRepositories_1 = require("../../infra/repositories/userRepositories");
const userPremium_1 = require("../../app/usecases/payment/userPremium");
const db = ownerModel_1.ownerModel;
const userDB = userModel_1.userModel;
const ownerRepo = (0, ownerRepositories_1.OwnerRepositoryImpl)(db);
const userRepo = (0, userRepositories_1.UserRepositoryImpl)(userDB);
const premiumController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stadiumId, orderId, ownerId, userId, stadiumPrice, date, startDate, endDate } = req.body;
        const setPremium = yield (0, ownerPremium_1.premiumOwner)(ownerRepo)(stadiumId, orderId, ownerId, userId, stadiumPrice, date, startDate, endDate);
        if (setPremium) {
            res.status(200).json({ success: "premmium updated" });
        }
        else {
            res.json({ failed: "premium is not upadated" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "ineternal server error" });
    }
});
exports.premiumController = premiumController;
const userPremiumController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stadiumId, orderId, email, stadiumPrice, userId, date, startDate, endDate } = req.body;
        const setPremium = yield (0, userPremium_1.premiumUser)(userRepo)(stadiumId, orderId, email, stadiumPrice, userId, date, startDate, endDate);
        if (setPremium) {
            res.status(200).json({ success: "premmium updated", setPremium });
        }
        else {
            res.json({ failed: "premium is not upadated" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "ineternal server error" });
    }
});
exports.userPremiumController = userPremiumController;
