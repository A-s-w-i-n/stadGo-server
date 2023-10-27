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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const ownerVerifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers, 'owner');
    const token = req.headers.ownerauthorization.split(" ")[1];
    console.log(token);
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRETE);
        if (data) {
            console.log(data, 'llll');
            next();
        }
        else {
        }
    }
    catch (error) { }
});
exports.default = ownerVerifyToken;
