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

userRouter.post("/logout", authMiddleware.protect, userControllers.userLogout);

userRouter.get("/current", authMiddleware.protect, userControllers.getUser);

userRouter.patch(
  "/avatars",
  authMiddleware.protect,
  userMiddleware.uploadAvatar,
  userControllers.updateAvatar
);
