import jwt, { JwtPayload } from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenvConfig();

const SECRET_JWT: jwt.Secret = process.env.SECRET_JWT || "Default secret";

interface CustomRequest extends Request {
  userId?: string; // Assuming userId is of type string
}

function verfifyJWT(req: CustomRequest, res: Response, next: NextFunction) {
  const TOKEN = req.headers["authorization"];
  if (!TOKEN || typeof TOKEN !== "string") {
    const response = {
      error: true,
      auth: false,
      message: "No token provided",
    };
    return res.status(401).json(response);
  }

  jwt.verify(TOKEN, SECRET_JWT, function (error, decoded) {
    if (error || !decoded) {
      const response = {
        error: true,
        messsage: "Failed to authenticate token",
      };
      return res.status(500).json(response);
    }

    const decodedPayload = decoded as JwtPayload;
    req.userId = decodedPayload.user_id;
    next();
  });
}

export default verfifyJWT;
