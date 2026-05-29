import { Messages } from "../constant/message.js";
import { verifyToken } from "../utils/token/token.service.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return next(
      new AppError(Messages.BAD_REQUEST, 401)
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    next(
      new AppError(Messages.INVALID_TOKEN, 401)
    );
  }
};