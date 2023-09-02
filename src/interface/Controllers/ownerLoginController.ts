import { Request, Response } from "express";
import { OwnerLogin } from "../../app/usecases/Owner/loginOwner";
import { ownerModel } from "../../infra/database/ownerModel";
import { OwnerRepositoryImpl } from "../../infra/repositories/ownerRepositories";
import { generateAccessToken } from "../../utils/jwtAuthentication";

const db = ownerModel;

const ownerRepo = OwnerRepositoryImpl(db);

export const ownerLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const ownerLoginCheck = await OwnerLogin(ownerRepo)(email, password);
    if (ownerLoginCheck) {
      const { _id, username } = JSON.parse(JSON.stringify(ownerLoginCheck));
      const accessToken = generateAccessToken(_id, username);
      res.status(200).json({
        message: "owner login successfull",
        ownerLoginCheck,
        accessToken,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
