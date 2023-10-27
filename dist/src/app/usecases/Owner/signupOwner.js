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
exports.signUpOwner = void 0;
const signUpOwner = (ownerRepository) => (firstname, lastname, ownername, password, email, companyname, phone, location, isblocked, premium, role) => __awaiter(void 0, void 0, void 0, function* () {
    const newOwner = {
        firstname,
        lastname,
        ownername,
        email,
        password,
        companyname,
        phone,
        location,
        isblocked,
        premium,
        role,
    };
    const createOwner = yield ownerRepository.create(newOwner);
    return createOwner;
});
exports.signUpOwner = signUpOwner;
