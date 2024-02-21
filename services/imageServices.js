import multer from "multer";
import path from "path";
import Jimp from "jimp";
import { v4 } from "uuid";
import fs from "fs";

import { HttpError } from "../utils/index.js";

export const initUploadImage = (name) => {
  // ініціалізація сховища multer
  const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "tmp/");
    },
    filename: function (req, file, cb) {
      cb(null, `${req.user.id}-${v4()}-${file.originalname}`);
    },
  });

  // Налаштування фільтру multer
  const multerFilter = (req, file, cbk) => {
    if (file.mimetype.startsWith("image/")) {
      cbk(null, true);
    } else {
      cbk(new HttpError(400, "Please, upload images only.."), false);
    }
  };

  return multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  }).single(name);
};

// Обробка аватарки за допомогою бібліотеки Jimp
export const trimAndSaveAvatar = async (file) => {
  if (file.size > 2 * 1024 * 1024) {
    fs.unlinkSync(file.path);
    throw new HttpError(400, "File is too large!");
  }

  const image = await Jimp.read(file.path);
  await image.resize(250, 250);
  await image.write(path.join("public", "avatars", `${file.filename}`));

  fs.unlinkSync(file.path);
};
