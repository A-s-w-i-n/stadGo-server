import { stadiumRepository } from "../../../infra/repositories/stadiumRepository";



export const editStadiumDetail = (stadiumRepo : stadiumRepository) =>async (id:string,stadiumname:string,sportstype:string,fromdate:string,todate:string,price:string,discription:string,)=>{
   
    
    const stadiumEdit = await  stadiumRepo.editStadium(id,stadiumname,sportstype,fromdate,todate,price,discription)

    if(stadiumEdit){
        return stadiumEdit
    }
    return null
}
export const checkBooked = (stadiumRepo : stadiumRepository)=> async (booked : string)=>{
    const check = await stadiumRepo.bookedCheck(booked)

    if(check){
        return check
    }
    return null

}
export const changeBooked = (stadiumRepo : stadiumRepository)=> async (email : string)=>{
    const check = await stadiumRepo.updateStatus(email)

    if(check){
        return check
    }
    return null

}
