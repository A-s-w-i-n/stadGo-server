import { Router } from "express";
import { ownerSignUpController } from "../Controllers/ownerController";
import { ownerLogin } from "../Controllers/ownerLoginController";
import { premiumController } from "../Controllers/paymentController";
import { fetchOnwer } from "../Controllers/ownerFetchController";
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
ownerRouter.post("/videoUplode",ownerVerifyToken, updateVideoUplode);


export default ownerRouter;
