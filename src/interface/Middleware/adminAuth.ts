import { NextFunction, Request,Response } from "express";
import jwt from 'jsonwebtoken'
require ('dotenv').config()

const adminVarifiction =async(req :Request,res:Response,next:NextFunction)=>{

    console.log(req.headers);

    const token :string =(req.headers.adminauthorization! as string).split(" ")[1]
    console.log(token);

    try {
        const data =jwt.verify(token,process.env.JWT_SECRETE as string)

        if(data){
            console.log(data,"kkkk");

            next()
            
        }else{

        }
    } catch (error) {
        
    }
    
    

}
export default adminVarifiction