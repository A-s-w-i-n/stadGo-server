import { stadiumRepository } from "../../../infra/repositories/stadiumRepository";



export const stadiumFilter = (stadiumRepo : stadiumRepository)=>async (firstValue : string,secondValue : string)=>{

    const filterStadium = await stadiumRepo.filterStadium(firstValue,secondValue)

    if(filterStadium){
        return filterStadium
    }
    return null
}