import express from "express";
import { userControllers } from "../controllers/index.js";
import { authMiddleware, userMiddleware } from "../middlewares/index.js";

export const userRouter = express.Router();

userRouter.post(
  "/register",
  userMiddleware.validateRegisterUser,
  userControllers.userRegister
);

userRouter.post(
  "/login",
  userMiddleware.validateLoginUser,
  userControllers.userLogin
);

userRouter.get("/verify/:verificationToken", userControllers.userVerify);

userRouter.post(
  "/verify",
  userMiddleware.validateVerifyRequestUser,
  userControllers.userVerifyRequest
);

userRouter.use(authMiddleware.protect);

userRouter.post("/logout", userControllers.userLogout);

userRouter.get("/current", userControllers.getUser);

userRouter.patch(
  "/avatars",
  userMiddleware.uploadAvatar,
  userControllers.updateAvatar
);
