import { adminRepository } from "../../../infra/repositories/adminRepository";

export const adminLogin = (adminRepository : adminRepository)=>async(email:string,password:string)=>{

   
    
    
    const adminEmailExist = await adminRepository.findByEmail(email)
   
    

    if(adminEmailExist&&adminEmailExist.password==password){
        return adminEmailExist
    }
}