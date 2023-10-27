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
exports.Login = void 0;
const loginUser_1 = require("../../app/usecases/user/loginUser");
const userModel_1 = require("../../infra/database/userModel");
const userRepositories_1 = require("../../infra/repositories/userRepositories");
const jwtAuthentication_1 = require("../../utils/jwtAuthentication");
const db = userModel_1.userModel;
const userRepository = (0, userRepositories_1.UserRepositoryImpl)(db);
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const LoginCheck = yield (0, loginUser_1.login)(userRepository)(email, password);
        if (LoginCheck) {
            const { _id, username } = JSON.parse(JSON.stringify(LoginCheck));
            const accessToken = (0, jwtAuthentication_1.generateAccessToken)(_id, username);
            res
                .status(200)
                .json({ message: "", LoginCheck, accessToken });
        }
        else {
            res.json({ message: "email or password  not valid" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.Login = Login;
