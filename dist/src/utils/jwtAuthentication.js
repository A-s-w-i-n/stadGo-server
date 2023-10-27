"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const generateAccessToken = (id, username) => {
    const expiresIn = "10m";
    const jwtAccessSecret = process.env.JWT_SECRETE;
    const accessToken = jsonwebtoken_1.default.sign({ id, username }, jwtAccessSecret, { expiresIn });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
