import { Request, Response, Router } from "express";
import {
  changedpassword,
    findProfileImg,
//   findProfileImg,
  updateImageControll,
  userSignController,
} from "../Controllers/userController";
import { Login } from "../Controllers/userLoginController";
import { userPremiumController } from "../Controllers/paymentController";
import { fetchUsersController } from "../Controllers/fetchUser";
import { forgotPassword, otpAuthContoller } from "../Controllers/userOtpAuth";
import { otpVerification } from "../Controllers/otpvarificationContorller";
import userVerifyToken from "../Middleware/userAuth";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  console.log("working");
  res.json({ status: true });
});
userRouter.post("/userRegister", userSignController);
userRouter.post("/login", Login);
userRouter.post("/userPayment", userPremiumController);
userRouter.post("/fetchUsers", fetchUsersController);
userRouter.post("/otp", otpAuthContoller);
userRouter.post('/forgotpassword',forgotPassword)
userRouter.post("/verifyOtp", otpVerification);
userRouter.post("/userProfileImage", updateImageControll);
userRouter.post("/fetchProfileImg",findProfileImg);
userRouter.post("/updatePassword",changedpassword)

export default userRouter;
