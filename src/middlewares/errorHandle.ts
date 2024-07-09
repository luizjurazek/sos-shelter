import { Request, Response, NextFunction } from "express";
import { CustomError, errorDetails } from "../types/errorTypes";
import statusCode from "../utils/statusCode";

function errorHandle(error: CustomError, req: Request, res: Response, next: NextFunction) {
  // verify if error have a statusCode defined if not, assign statusCode.INTERNAL_SERVER_ERROR
  const statusCodeError: number = error.statusCode || statusCode.INTERNAL_SERVER_ERROR;

  let message: string = "Internal Server Error";

  if (error.message) {
    message = error.message;
  }

  const errorDetails: errorDetails = {
    error: true,
    message: message,
  };

  if (error.errors) {
    errorDetails.errors = error.errors;
  }

  if (process.env.NODE_ENV === "development") {
    errorDetails.stack = error.stack;
  }

  return res.status(statusCodeError).json(errorDetails);
}

export default errorHandle;
