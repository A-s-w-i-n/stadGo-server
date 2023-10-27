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
exports.ownerUnblock = exports.ownerBlock = exports.userUnblock = exports.userBlock = exports.fetchOwner = exports.fetchUsers = void 0;
const fetchUsers = (userRepo) => () => __awaiter(void 0, void 0, void 0, function* () {
    const adminfetchUser = yield userRepo.findUser();
    if (adminfetchUser) {
        return adminfetchUser;
    }
    return adminfetchUser;
});
exports.fetchUsers = fetchUsers;
const fetchOwner = (ownerRepo) => () => __awaiter(void 0, void 0, void 0, function* () {
    const adminfetchOwner = yield ownerRepo.findOwner();
    if (adminfetchOwner) {
        return adminfetchOwner;
    }
});
exports.fetchOwner = fetchOwner;
const userBlock = (userRepository) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blockusers = yield userRepository.blockUsers(id);
    return blockusers;
});
exports.userBlock = userBlock;
const userUnblock = (userRepository) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userunblock = yield userRepository.unblcokuser(id);
    return userunblock;
});
exports.userUnblock = userUnblock;
const ownerBlock = (onwerRepository) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blockusers = yield onwerRepository.blockOwners(id);
    return blockusers;
});
exports.ownerBlock = ownerBlock;
const ownerUnblock = (ownerRepository) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ownerunblock = yield ownerRepository.unblcokowner(id);
    return ownerunblock;
});
exports.ownerUnblock = ownerUnblock;
