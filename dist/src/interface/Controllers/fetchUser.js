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
exports.fetchUsersController = void 0;
const userModel_1 = require("../../infra/database/userModel");
const fetchUser_1 = require("../../app/usecases/user/fetchUser");
const userRepositories_1 = require("../../infra/repositories/userRepositories");
const db = userModel_1.userModel;
const userRepo = (0, userRepositories_1.UserRepositoryImpl)(db);
const fetchUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // const existUser =fetchUsers(userRepo)(email)
        const userDetail = yield (0, fetchUser_1.fetchUsers)(userRepo)(email);
        if (userDetail) {
            res.status(200).json({ message: "data fetch success", userDetail });
        }
        else {
            res.json({ failed: " data fetch failed" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.fetchUsersController = fetchUsersController;
