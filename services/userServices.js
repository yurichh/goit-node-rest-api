import { imageServices, jwtServices } from "./index.js";
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

export async function logoutUser(id) {
  await User.findByIdAndDelete(id);
}

export async function getUserById(userId) {
  return await User.findOne({ _id: userId });
}

export async function updateAvatar(user, file) {
  // Обробка аватарки за допомогою бібліотеки Jimp
  await imageServices.trimAndSaveAvatar(file);

  const updatedPhotoPath = `/avatars/${file.filename}`;

  return await User.findByIdAndUpdate(
    user.id,
    { avatarURL: updatedPhotoPath },
    {
      new: true,
    }
  );
}
