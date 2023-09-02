import { Request, Response } from "express";
import { userModel } from "../../infra/database/userModel";
import { fetchUsers } from "../../app/usecases/user/fetchUser";
import { UserRepositoryImpl } from "../../infra/repositories/userRepositories";

const db = userModel;

const userRepo = UserRepositoryImpl(db);

export const fetchUsersController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const userDetail = await fetchUsers(userRepo)(email);

    if (userDetail) {
      res.status(200).json({ message: "data fetch success", userDetail });
    } else {
      res.json({ failed: " data fetch failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
