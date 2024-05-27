import Router from "express";
import { Request, Response, NextFunction } from "express";
import errorHandle from "../middleware/errorHandle";
import { CustomError } from "../types/errorTypes";

const router = Router();

router.get("/errorhandle", (req: Request, res: Response, next: NextFunction) => {
  try {
    // Throw a error for teste middleware
    const error: CustomError = new Error("Erro proposital para teste");
    error.statusCode = 400;
    throw error;
  } catch (error) {
    next(error);
  }
});

router.use(errorHandle);

export default router;
