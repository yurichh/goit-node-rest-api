import { jwtServices, userServices } from "../services/index.js";
import { HttpError, catchAsync } from "../utils/index.js";

export const protect = catchAsync(async (req, _, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];

  const userId = jwtServices.checkToken(token);

  if (!userId) throw new HttpError(401, "Not authorized..");

  const currentUser = await userServices.getUserById(userId);

  if (!currentUser) throw new HttpError(401, "Not authorized..");

  req.user = currentUser;

  next();
});
