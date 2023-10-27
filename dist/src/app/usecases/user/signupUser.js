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
exports.signupUser = void 0;
const signupUser = (UserRepository) => (firstname, lastname, username, email, password, isblocked, premium, phone, isGoogle, role) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {
        email,
        firstname,
        lastname,
        username,
        password,
        isblocked,
        premium,
        phone,
        isGoogle,
        role,
    };
    const createUser = yield UserRepository.create(newUser);
    return createUser;
});
exports.signupUser = signupUser;
