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
exports.ownerSignUpController = void 0;
const ownerModel_1 = require("../../infra/database/ownerModel");
const ownerRepositories_1 = require("../../infra/repositories/ownerRepositories");
const signupOwner_1 = require("../../app/usecases/Owner/signupOwner");
const db = ownerModel_1.ownerModel;
const ownerRepository = (0, ownerRepositories_1.OwnerRepositoryImpl)(db);
const ownerSignUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, ownername, email, password, phone, companyname, location, } = req.body;
    const premium = false;
    const isblocked = false;
    const role = "owner";
    try {
        const owner = yield (0, signupOwner_1.signUpOwner)(ownerRepository)(firstname, lastname, ownername, password, email, companyname, phone, location, isblocked, premium, role);
        res.status(201).json({ messgae: "data found", owner });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.ownerSignUpController = ownerSignUpController;
