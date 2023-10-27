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
exports.fetchDetaildView = exports.fetchStadiumList = void 0;
const fetchStadiumList = (stadiumRepo) => () => __awaiter(void 0, void 0, void 0, function* () {
    const fetchList = yield stadiumRepo.findStadiumList();
    if (fetchList) {
        return fetchList;
    }
    return fetchList;
});
exports.fetchStadiumList = fetchStadiumList;
const fetchDetaildView = (stadiumRepo) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    const fectchDetails = yield stadiumRepo.findStadiumById(id);
    if (fectchDetails) {
        return fectchDetails;
    }
    return fectchDetails;
});
exports.fetchDetaildView = fetchDetaildView;
