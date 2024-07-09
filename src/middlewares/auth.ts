import jwt, { JwtPayload } from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";
import { Request, Response, NextFunction, response } from "express";
import BlacklistToken from "../controllers/blacklistTokenController";
import statusCode from "../utils/statusCode";
dotenvConfig();

const SECRET_JWT: jwt.Secret = process.env.SECRET_JWT || "Default secret";
const BlacklistTokenController = new BlacklistToken();
interface CustomRequest extends Request {
  userId?: string; // Assuming userId is of type string
}

async function verfifyJWT(req: CustomRequest, res: Response, next: NextFunction) {
  const TOKEN = req.headers["authorization"];
  if (!TOKEN || typeof TOKEN !== "string") {
    const response = {
      error: true,
      auth: false,
      message: "No token provided",
    };
    return res.status(statusCode.UNAUTHORIZED).json(response);
  }

  const isAlreadyTokenOnBlackList: boolean = await BlacklistTokenController.verifyTokenOnBlackList(TOKEN);

  if (isAlreadyTokenOnBlackList) {
    const response = {
      error: true,
      message: "Unauthorized user, do login again",
    };
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json(response);
  }

  jwt.verify(TOKEN, SECRET_JWT, function (error, decoded) {
    if (error || !decoded) {
      const response = {
        error: true,
        messsage: "Failed to authenticate token",
      };
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(response);
    }

    const decodedPayload = decoded as JwtPayload;
    req.userId = decodedPayload.user_id;
    next();
  });
}

export default verfifyJWT;
