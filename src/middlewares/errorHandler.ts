import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export default function errorHandler(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res
    .status(500)
    .json({ message: `Internal Server Error: ${error.message}` });
}
