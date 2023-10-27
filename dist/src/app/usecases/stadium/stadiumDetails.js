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
exports.addStadium = void 0;
const addStadium = (stadiumRepository) => (stadiumname, maxcapacity, sportstype, fromdate, todate, price, image, discription, location, email, id) => __awaiter(void 0, void 0, void 0, function* () {
    const newStadium = {
        stadiumname,
        maxcapacity,
        sportstype,
        fromdate,
        todate,
        price,
        image,
        discription,
        location,
        email,
        id,
    };
    const stadiumAdd = yield stadiumRepository.create(newStadium);
    return stadiumAdd;
});
exports.addStadium = addStadium;
