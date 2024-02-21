import { emailServices, imageServices, jwtServices } from "./index.js";
import { User } from "./../models/userModel.js";
import { HttpError } from "../utils/index.js";

export async function registerUser(userData) {
  const newUser = await User.create(userData);

  newUser.password = undefined;

  const token = jwtServices.signToken(newUser.id);

  await emailServices.sendMail(
    userData.email,
    "VERIFICATION",
    `Please follow the link *http://localhost:3000/users/verify/${newUser.verificationToken}* to verificate your account`
  );

  return { user: newUser, token };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email }).select("+password");

  if (user === null) throw new HttpError(401, "Email or password is wrong...");

  if (!user.verify) throw new HttpError(400, "You must verify your account...");

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

  user.avatarURL = `/avatars/${file.filename}`;

  await user.save();

  return user;
}

export async function verifyUser(verificationToken) {
  const user = await User.findOne({ verificationToken });

  if (!user) throw new HttpError(404, "User not found");

  user.verificationToken = null;
  user.verify = true;
  await user.save();
}

export async function verifyRequestUser(email) {
  const user = await User.findOne({ email });

  if (user.verify)
    throw new HttpError(400, "Verification has already been passed");

  await emailServices.sendMail(
    email,
    "VERIFICATION",
    `Please follow the link *http://localhost:3000/users/verify/${user.verificationToken}* to verificate your account`
  );
}
