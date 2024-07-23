import { Request, Response, NextFunction } from "express";
import User from "../models/user/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";
import BlacklistToken from "./blacklistTokenController";
import statusCode from "../utils/statusCode";
dotenvConfig();

const SECRET_JWT: jwt.Secret = process.env.SECRET_JWT || "Default_secret";
const UserModel = User;
const BlacklistTokenController = new BlacklistToken();

class LoginController {
  // method to do login
  async login(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['Login']
    // #swagger.description = 'Endpoint to do login'
    try {
      const { email, password }: { email: string; password: string } = req.body;

      const user = await UserModel.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        const response: object = {
          error: true,
          message: "User not found",
        };

        return res.status(statusCode.NOT_FOUND).json(response);
      }

      // Compare password in bd with password inserted
      if (!(await bcrypt.compare(password, user.dataValues.password))) {
        const response: object = {
          error: true,
          message: "Email or password is wrong",
        };

        return res.status(statusCode.UNAUTHORIZED).json(response);
      }

      // Seven days on miliseconds to expire the token valid
      const SEVEN_DAYS_IN_MILISECONS: number = 7 * 24 * 60 * 60 * 1000;

      // Generate the token
      const TOKEN = jwt.sign(
        {
          user_id: user.dataValues.id,
        },
        SECRET_JWT,
        {
          expiresIn: SEVEN_DAYS_IN_MILISECONS,
        },
      );

      const response: object = {
        error: false,
        message: "Login successfully",
        email: user.dataValues.email,
        id_user: user.dataValues.id,
        token: TOKEN,
      };

      return res.status(statusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  // method to do logout
  async logout(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['Login']
    // #swagger.description = 'Endpoint to do logout'
    try {
      const token: string | undefined = req.headers["authorization"];

      if (!token) {
        const response = { error: true, message: "Authorization header missing" };
        return res.status(statusCode.BAD_REQUEST).json(response);
      }

      const insertedTokenOnBlacklist: boolean = await BlacklistTokenController.insertToken(token);

      if (!insertedTokenOnBlacklist) {
        const response: object = {
          error: true,
          message: "There was an error while logging out",
        };

        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(response);
      } else {
        const response: object = {
          error: true,
          message: "Logging out with successfully",
        };

        return res.status(statusCode.OK).json(response);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default LoginController;
