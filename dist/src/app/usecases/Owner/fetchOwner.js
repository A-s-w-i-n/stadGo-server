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
exports.fetchOwnerById = exports.fetchOwners = void 0;
const fetchOwners = (ownerRepo) => (email, item) => __awaiter(void 0, void 0, void 0, function* () {
    const ownerFetch = yield ownerRepo.ownerFetch(email, item);
    if (ownerFetch) {
        return ownerFetch;
    }
    return ownerFetch;
});
exports.fetchOwners = fetchOwners;
const fetchOwnerById = (ownerRepo) => (ownerid) => __awaiter(void 0, void 0, void 0, function* () {
    const fetch = yield ownerRepo.ownerFetchById(ownerid);
    if (fetch) {
        return fetch;
    }
});
exports.fetchOwnerById = fetchOwnerById;
