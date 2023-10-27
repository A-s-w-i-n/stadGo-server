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
exports.ownerModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ownerSchema = new mongoose_1.Schema({
    firstname: {
        type: "string",
        required: true,
    },
    lastname: {
        type: "string",
        required: true,
    },
    ownername: {
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
        unique: true,
    },
    password: {
        type: "string",
        required: true,
    },
    location: {
        type: "string",
        required: true,
    },
    companyname: {
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
    role: {
        type: "string",
        default: "owner",
    },
    User: [{
            type: mongoose_1.default.Types.ObjectId,
            unique: true,
            ref: "User"
        }],
    paymentDetails: [{
            orderId: {
                type: String,
                required: true,
            },
            stadiumId: {
                type: String,
                required: true,
            },
            userId: {
                type: "string",
                required: true,
            },
            stadiumPrice: {
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
    // profileImg : {
    //     type : 'string',
    // }
});
exports.ownerModel = mongoose_1.default.connection.model("Owner", ownerSchema);
