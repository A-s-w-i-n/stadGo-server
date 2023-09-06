import { Router } from "express";
import { ownerSignUpController } from "../Controllers/ownerController";
import { ownerLogin } from "../Controllers/ownerLoginController";
import { premiumController } from "../Controllers/paymentController";
import { fetchOnwer, fetchOwnerByid, listUser, userinfo } from "../Controllers/ownerFetchController";
import { updateVideoUplode } from "../Controllers/stadiumController";
import userVerifyToken from "../Middleware/userAuth";
import ownerVerifyToken from "../Middleware/ownerAuth";

// import { createPaymentIntent } from "../Controllers/onwerPremiumController";
const ownerRouter = Router();
ownerRouter.get("/owner", (req, res) => {
  console.log("working");
  res.json({ status: true });
});
ownerRouter.post("/ownerRegister", ownerSignUpController);
ownerRouter.post("/ownerLogin", ownerLogin);
ownerRouter.post("/ownerPremium", premiumController);
ownerRouter.post("/fetchOwner", fetchOnwer);
ownerRouter.get('/fetchOwnerById',fetchOwnerByid)
ownerRouter.post("/videoUplode",ownerVerifyToken, updateVideoUplode);
ownerRouter.post('/userList',userVerifyToken,userinfo)
ownerRouter.post('/userListFetch',listUser)


export default ownerRouter;
