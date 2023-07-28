import { Owner} from "../../../domain/models/owner";
import { ownerRepository } from "../../../infra/repositories/ownerRepositories";

export const signUpOwner = (ownerRepository : ownerRepository)=> async (firstname :string,lastname:string,ownername:string,password:string,email:string,companyname:string,phone:string,location:string,isblocked:boolean,premium:boolean):Promise<Owner>=>{
    const newOwner:Owner={
        firstname,
        lastname,
        ownername,
        email,
        password,
        companyname,
        phone,
        location  ,
        isblocked,
        premium  ,    
    

    }
    
    
    const createOwner = await ownerRepository.create(newOwner)
    console.log("owner is comming");
    return createOwner   
}