import { stadium } from "../../../domain/models/stadium";
import { stadiumRepository } from "../../../infra/repositories/stadiumRepository";


export const  addStadium = (stadiumRepository : stadiumRepository) =>async(stadiumname:string,maxcapacity:string,sportstype:string,fromdate :string,todate :string,price : string,image : string[],discription : string,location : string,email : string):Promise<stadium>=>{
    const newStadium : stadium = {
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
    }
  
    
    const stadiumAdd = await stadiumRepository.create(newStadium)
    
    return stadiumAdd 
} 