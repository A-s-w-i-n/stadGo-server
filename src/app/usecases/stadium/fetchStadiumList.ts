import { stadium } from "../../../domain/models/stadium";
import { stadiumRepository } from "../../../infra/repositories/stadiumRepository";

export const fetchStadiumList = (stadiumRepo : stadiumRepository)=>async ()=>{
    const fetchList : stadium[] = await stadiumRepo.findStadiumList()

    if(fetchList){
        return fetchList
    }
    return fetchList
}