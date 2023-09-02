import { Request, Response } from "express";
import { login } from "../../app/usecases/user/loginUser";
import { userModel } from "../../infra/database/userModel";
import { UserRepositoryImpl } from "../../infra/repositories/userRepositories";
import { generateAccessToken } from "../../utils/jwtAuthentication";

const db = userModel;
const userRepository = UserRepositoryImpl(db);

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const LoginCheck = await login(userRepository)(email, password);
    if (LoginCheck) {
      const { _id, username } = JSON.parse(JSON.stringify(LoginCheck));
      const accessToken = generateAccessToken(_id, username);

      res
        .status(200)
        .json({ message: "login successfull", LoginCheck, accessToken });
    } else {
      res.json({ message: "email or password  not valid" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
