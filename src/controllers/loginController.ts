import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const SECRET_JWT: jwt.Secret = process.env.SECRET_JWT || "Default_secret";
const UserModel = User;

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

        return res.status(404).json(response);
      }

      if (!(await bcrypt.compare(password, user.dataValues.password))) {
        const response: object = {
          error: true,
          message: "Email or password is wrong",
        };

        return res.status(401).json(response);
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

      const response = {
        error: false,
        message: "Login successfully",
        email: user.dataValues.email,
        id_user: user.dataValues.id,
        token: TOKEN,
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default LoginController;
