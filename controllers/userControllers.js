import { userServices } from "../services/index.js";
import { catchAsync } from "../utils/index.js";

export const userRegister = catchAsync(async (req, res) => {
  const userData = await userServices.registerUser(req.body);

  res.status(201).json({
    msg: "Success register",
    user: {
      email: userData.user.email,
      subscription: userData.user.subscription,
    },
  });
});

export const userLogin = catchAsync(async (req, res) => {
  const userData = await userServices.loginUser(req.body);

  res.status(200).json({
    msg: "Success login",
    token: userData.token,
    user: {
      email: userData.user.email,
      subscription: userData.user.subscription,
    },
  });
});

export const userLogout = catchAsync(async (req, res) => {
  console.log(req.user.id);

  userServices.logoutUser(req.user.id);
  res.status(204).json();
});

export const getUser = catchAsync(async (req, res) => {
  res.status(200).json({
    msg: "Success getting info",
    user: {
      email: req.user.email,
      subscription: req.user.subscription,
    },
  });
});
