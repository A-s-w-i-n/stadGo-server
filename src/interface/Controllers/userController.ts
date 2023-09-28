import { Request, Response, json } from "express";
import { userModel } from "../../infra/database/userModel";
import { UserRepositoryImpl } from "../../infra/repositories/userRepositories";
import { signupUser } from "../../app/usecases/user/signupUser";
import { generateAccessToken } from "../../utils/jwtAuthentication";
import { login } from "../../app/usecases/user/loginUser";
import {
  fecthUserImage,
  userUpdateImg,
} from "../../app/usecases/user/profileImg";
import { upadatePassword } from "../../app/usecases/user/updatePassword";

const db = userModel;

const userRepository = UserRepositoryImpl(db);

export const userSignController = async (req: Request, res: Response) => {
  const { firstname, lastname, username, email, phone, password, isGoogle } =
    req.body;

  const premium = false;
  const isblocked = false;
  const role = "user";

  try {
    const Guser = await login(userRepository)(email, password);
    if (Guser == null) {
      const user = await signupUser(userRepository)(
        firstname,
        lastname,
        username,
        email,
        password,
        isblocked,
        premium,
        phone,
        isGoogle,
        role
      );
      res.status(201).json({ message: "data found", user });
    } else if (isGoogle == true) {
      res.status(201).json({ message: "data founded ", Guser });
    } else {
      res.json({ message: "data is not found" });
    }
  } catch {
    res.status(500).json({ message: "internal server error" });
  }
};
export const updateImageControll = async (req: Request, res: Response) => {
  try {
    
    const { id, url } = req.body;
    const uplodeImg = await userUpdateImg(userRepository)(id, url);
    if (uplodeImg) {
      
      res.status(200).json({ succes: " profile image  uplode success",uplodeImg });
    } else {
      res.json({ faile: "profile image uplode fail" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
export const findProfileImg = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const findImg = await fecthUserImage(userRepository)(id);

    if (findImg) {
      
      res.status(200).json({ message: "image fetch success", findImg });
    } else {
      res.json("image fetch faild");
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
export const changedpassword = async (req :Request,res: Response)=>{
  try {
    const {email,changedpassword} =req.body

    const change =await upadatePassword(userRepository)(email,changedpassword)

    if(change){
      res.status(200).json({message : "password updated",change})
    }else{
      res.json("password is not updated")
    }
  } catch (error) {
    res.status(500).json({error : "internal server error"})
    
  }
}