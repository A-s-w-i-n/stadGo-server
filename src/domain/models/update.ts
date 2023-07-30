import { ObjectId } from "bson"


export interface updateRes {
    acknowledged : boolean,
    modifiedCount : number,
    upsertedCount : number,
    matchedCount : number,
    upsertedId :ObjectId  | null

}