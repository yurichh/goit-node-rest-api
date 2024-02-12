import { jwtServices } from "./index.js";
import { User } from "./../models/userModel.js";
import { HttpError } from "../utils/index.js";

export async function registerUser(userData) {
  const newUser = await User.create(userData);

  newUser.password = undefined;

  const token = jwtServices.signToken(newUser.id);

  return { user: newUser, token };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email }).select("+password");

  if (user === null) throw new HttpError(401, "Email or password is wrong...");

  if (password !== user.password)
    throw new HttpError(401, "Email or password is wrong...");

  user.password = undefined;

  const token = jwtServices.signToken(user.id);

  return { user, token };
}

export function logoutUser(id) {
  User.findByIdAndDelete(id);
}
export async function getUserById(userId) {
  return await User.findOne({ _id: userId });
}
