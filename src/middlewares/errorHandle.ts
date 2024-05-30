import { Request, Response, NextFunction } from "express";
import { CustomError, errorDetails } from "../types/errorTypes";

function errorHandle(error: CustomError, req: Request, res: Response, next: NextFunction) {
  // verify if error have a statusCode defined if not, assign 500
  const statusCode: number = error.statusCode || 500;

  let message: string = "Internal Server Error";

  if (error.message) {
    message = error.message;
  }

  const errorDetails: errorDetails = {
    error: true,
    message: message,
  };

  if (process.env.NODE_ENV === "development") {
    errorDetails.stack = error.stack;
  }

  return res.status(statusCode).json(errorDetails);
}

export default errorHandle;
