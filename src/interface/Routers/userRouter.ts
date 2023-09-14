import { Request, Response, Router } from "express";
import {
    findProfileImg,
//   findProfileImg,
  updateImageControll,
  userSignController,
} from "../Controllers/userController";
import { Login } from "../Controllers/userLoginController";
import { userPremiumController } from "../Controllers/paymentController";
import { fetchUsersController } from "../Controllers/fetchUser";
import { otpAuthContoller } from "../Controllers/userOtpAuth";
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
userRouter.post("/verifyOtp", otpVerification);
userRouter.post("/userProfileImage", updateImageControll);
userRouter.post("/fetchProfileImg",userVerifyToken, findProfileImg);

export default userRouter;
