import jwt from "jsonwebtoken";
import { HttpError } from "../utils/index.js";

export const signToken = (id) =>
  jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });

export const checkToken = (token) => {
  if (!token) throw new HttpError(401, "Not logged in...");

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    return id;
  } catch (err) {
    throw new HttpError(401, "Not logged in...");
  }
};
