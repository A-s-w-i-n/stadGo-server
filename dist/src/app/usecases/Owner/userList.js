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
exports.userList = exports.userDetails = void 0;
const userDetails = (ownerRepo) => (userId, ownerid) => __awaiter(void 0, void 0, void 0, function* () {
    const listUser = yield ownerRepo.userInfo(userId, ownerid);
    if (listUser) {
        return listUser;
    }
});
exports.userDetails = userDetails;
const userList = (ownerRepo) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userList = yield ownerRepo.userList(id);
    if (userList) {
        return userList;
    }
});
exports.userList = userList;
