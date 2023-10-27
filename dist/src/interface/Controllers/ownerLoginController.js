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
exports.ownerLogin = void 0;
const loginOwner_1 = require("../../app/usecases/Owner/loginOwner");
const ownerModel_1 = require("../../infra/database/ownerModel");
const ownerRepositories_1 = require("../../infra/repositories/ownerRepositories");
const jwtAuthentication_1 = require("../../utils/jwtAuthentication");
const db = ownerModel_1.ownerModel;
const ownerRepo = (0, ownerRepositories_1.OwnerRepositoryImpl)(db);
const ownerLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const ownerLoginCheck = yield (0, loginOwner_1.OwnerLogin)(ownerRepo)(email, password);
        if (ownerLoginCheck) {
            const { _id, username } = JSON.parse(JSON.stringify(ownerLoginCheck));
            const accessToken = (0, jwtAuthentication_1.generateAccessToken)(_id, username);
            res.status(200).json({
                message: "",
                ownerLoginCheck,
                accessToken,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.ownerLogin = ownerLogin;
