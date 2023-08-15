import { Request, Response } from "express";
import { adminModel } from "../../infra/database/adminModel";
import { adminRepositoryimpl } from "../../infra/repositories/adminRepository";
import { generateAccessToken } from "../../utils/jwtAuthentication";
import { adminLogin } from "../../app/usecases/admin/adminLogin";
const db = adminModel;

const adminRepo = adminRepositoryimpl(db);

export const AdminLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const adminLoginCheck = await adminLogin(adminRepo)(email, password);

    if (adminLoginCheck) {
      const { _id, email } = JSON.parse(JSON.stringify(adminLoginCheck));
      const accessToken = generateAccessToken(_id, email);
      res.status(200).json({
        message: "admin login successfull",
        adminLoginCheck,
        accessToken,
      });
    } else {
      res.json({ message: "admin login fail" });
    }
  } catch (error) {
    res.status(500).json({ message: " internal server error" });
  }
};
