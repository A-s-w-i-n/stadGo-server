"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const db = () => {
    mongoose_1.default
        .connect("mongodb+srv://aswinachuz894:stadgo@cluster0.cvp4dws.mongodb.net/stadGo")
        .then(() => {
        console.log("database connected");
    })
        .catch((error) => {
        console.log(error.message);
    });
};
exports.db = db;
