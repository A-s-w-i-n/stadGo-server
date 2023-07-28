import { admin } from "../../domain/models/admin";
import { MongoDBAdmin } from "../database/adminModel";


export type adminRepository = {
    findByEmail : (email : string)=>Promise<admin | null>
}
export const adminRepositoryimpl = (AdminModel : MongoDBAdmin):adminRepository=>{
    const findByEmail = async (email : string):Promise<admin | null>=>{
        console.log("hhhhh");
        console.log(email);
        
        console.log(AdminModel);
        
        const admin = await AdminModel.findOne({email}) 
        const ad = await AdminModel.find() 
        console.log("hhhhhhh",admin,ad);
        
        return admin ? admin.toObject() : null
    }
    return {
        findByEmail
    }
}


