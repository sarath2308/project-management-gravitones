import { HttpStatus } from '../constant/http.status.js';
import { Messages } from '../constant/message.js';
import { AppError } from '../utils/error/app.error.js';
import { verifyToken } from '../utils/token/token.service.js';

export const authenticate = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(new AppError(Messages.UNAUTHORIZED || 'Unauthorized', HttpStatus.UNAUTHORIZED));
  }

  try {
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    return next(new AppError(Messages.INVALID_TOKEN || 'Invalid token', HttpStatus.UNAUTHORIZED));
  }
};
