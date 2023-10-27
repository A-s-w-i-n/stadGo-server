"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    firstname: {
        type: "string",
        required: true,
    },
    lastname: {
        type: "string",
        required: true,
    },
    username: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
        unique: true,
    },
    phone: {
        type: "string",
        required: true,
    },
    password: {
        type: "string",
        required: true,
    },
    isblocked: {
        type: "boolean",
        default: false,
    },
    premium: {
        type: "boolean",
        default: false,
    },
    isGoogle: {
        type: "boolean",
        default: false,
    },
    role: {
        type: "string",
        default: "user",
    },
    profileImg: {
        type: "string",
        default: "https://o.remove.bg/downloads/f1b14daf-e2c0-4c71-bc8e-e4af56c9cdbf/profile_default_img-removebg-preview.png"
    },
    paymentDetails: [{
            orderId: {
                type: String,
                required: true,
            },
            stadiumId: {
                type: String,
                required: true,
            },
            stadiumPrice: {
                type: "string",
                required: true
            },
            userId: {
                type: "string",
                required: true
            },
            date: {
                type: "string",
                required: true
            },
            startDate: {
                type: "string",
                required: true
            },
            endDate: {
                type: "string",
                required: true
            }
        }]
});
exports.userModel = mongoose_1.default.connection.model("User", userSchema);
