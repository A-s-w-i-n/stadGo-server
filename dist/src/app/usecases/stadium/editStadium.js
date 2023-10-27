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
exports.changeBooked = exports.checkBooked = exports.editStadiumDetail = void 0;
const editStadiumDetail = (stadiumRepo) => (id, stadiumname, sportstype, fromdate, todate, price, discription) => __awaiter(void 0, void 0, void 0, function* () {
    const stadiumEdit = yield stadiumRepo.editStadium(id, stadiumname, sportstype, fromdate, todate, price, discription);
    if (stadiumEdit) {
        return stadiumEdit;
    }
    return null;
});
exports.editStadiumDetail = editStadiumDetail;
const checkBooked = (stadiumRepo) => (booked) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield stadiumRepo.bookedCheck(booked);
    if (check) {
        return check;
    }
    return null;
});
exports.checkBooked = checkBooked;
const changeBooked = (stadiumRepo) => (email) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield stadiumRepo.updateStatus(email);
    if (check) {
        return check;
    }
    return null;
});
exports.changeBooked = changeBooked;
