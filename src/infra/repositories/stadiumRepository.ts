import { type } from "os";
import { stadium } from "../../domain/models/stadium";
import { MongoDBStadium } from "../database/stadiumModel";

export type stadiumRepository = {
    create : (stadium : stadium)=>Promise<stadium>
    findStadiumByEmail : (email : string)=>Promise<stadium[]>
    findStadiumList : ()=>Promise<stadium[]>
}

export const stadiumRepositoryImpl = (stadiumModel : MongoDBStadium):stadiumRepository=>{
    const create = async (stadium : stadium) : Promise<stadium>=>{
        
        const addStadium = await stadiumModel.create(stadium)
        console.log("hiiiii");
        return addStadium
    }
    const findStadiumByEmail = async (email :string) : Promise<stadium[]>=>{
        const fetchStadiumData =  await stadiumModel.find({email})
        return fetchStadiumData
    }
    const findStadiumList  = async () : Promise<stadium[]>=>{
        const stadiumList = await stadiumModel.find()
        return stadiumList
    }
    return{
        create,
        findStadiumByEmail,
        findStadiumList
    }
}