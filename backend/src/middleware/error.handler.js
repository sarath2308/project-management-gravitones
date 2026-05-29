import { ZodError } from "zod";
import { AppError } from "../utils/error/app.error.js";

export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.originalUrl}`);
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: err.errors.map((e) => e.message).join(", "),
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};