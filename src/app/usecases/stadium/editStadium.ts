import { stadiumRepository } from "../../../infra/repositories/stadiumRepository";



export const editStadiumDetail = (stadiumRepo : stadiumRepository) =>async (id:string,sportstype:string,fromdate:string,todate:string,price:string,discription:string)=>{
    const stadiumEdit = await  stadiumRepo.editStadium(id,sportstype,fromdate,todate,price,discription)

    if(stadiumEdit){
        return stadiumEdit
    }
    return null
}
