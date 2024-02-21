import { User } from "../models/userModel.js";
import { userSchemas } from "../schemas/index.js";
import { imageServices } from "../services/index.js";
import { catchAsync } from "../utils/catchAsync.js";
import { HttpError } from "../utils/httpError.js";

export const validateRegisterUser = catchAsync(async (req, res, next) => {
  const validationResult = userSchemas.registerUser.validate(req.body);

  if (validationResult.error)
    throw new HttpError(400, validationResult.error.message);

  const isEmailRepeat = await User.findOne({ email: req.body.email });

  if (isEmailRepeat)
    throw new HttpError(409, "User with this email already exist");

  next();
});

export const validateLoginUser = catchAsync(async (req, res, next) => {
  const validationResult = userSchemas.loginUser.validate(req.body);

  if (validationResult.error)
    throw new HttpError(400, validationResult.error.message);

  next();
});

export const validateVerifyRequestUser = catchAsync(async (req, res, next) => {
  const validationResult = userSchemas.verifyRequest.validate(req.body);

  if (validationResult.error)
    throw new HttpError(400, validationResult.error.message);

  next();
});

export const uploadAvatar = imageServices.initUploadImage("avatar");
