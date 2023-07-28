import { User } from "../../../domain/models/user";
import { userRepository } from "../../../infra/repositories/userRepositories";


export const signupUser = (UserRepository : userRepository) => async(firstname:string,lastname:string,username:string,email:string,password:string,isblocked:boolean,premium:boolean,phone:string,isGoogle:boolean):Promise<User>=>{

     const newUser:User={
        email,
        firstname,
        lastname,
        username,
        password,
        isblocked,
        premium,
        phone,
        isGoogle,
     }
    
     
     
     const createUser = await UserRepository.create(newUser)
    
    
     
     return createUser
}