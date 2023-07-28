import { Owner } from "../../domain/models/owner";
import { MongoDBOwner } from "../database/ownerModel";



export type ownerRepository = {
    create : (owner:Owner)=>Promise<Owner>
    findByEmail : (email:string)=>Promise<Owner | null>
    
}

export const OwnerRepositoryImpl = (OwnerModel:MongoDBOwner):ownerRepository=>{
    const findByEmail =async (email : string):Promise<Owner | null> =>{
        const owner =  await OwnerModel.findOne({email})
        return owner ? owner.toObject() : null
    }
    const create =async (owner:Owner) : Promise<Owner>=>{
        console.log("comming hereeeeeeeeee");
    
        const createOwner = await OwnerModel.create(owner)
        console.log(createOwner);
        
        return createOwner.toObject()
    
    }
    return{
        findByEmail,
        create
    }

}

