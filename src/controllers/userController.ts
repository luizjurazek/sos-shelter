import { Request, Response, NextFunction } from "express";
import { sequelize } from "../config/connection";
import User from "../models/userModel";

const UserModel = User;

class UserController {
  // method to get all users
  async getUsers(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to get all users'
    try {
      const allUsers = await UserModel.findAll();

      const response = {
        error: false,
        message: "Users founds successfully",
        users: allUsers,
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // method to get a user
  async getUser(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to get a users'
    const { id, email }: { id?: number; email?: string } = req.body;
    let user;

    try {
      if (id && email) {
        user = await UserModel.findOne({
          where: {
            id,
            email,
          },
        });
      } else if (id) {
        user = await UserModel.findOne({
          where: {
            id,
          },
        });
      } else if (email) {
        user = await UserModel.findOne({
          where: {
            email,
          },
        });
      }

      const response = {
        error: false,
        message: "User found successfully",
        user,
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // method to create a new user
  async createUser(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to create a user'
    try {
      const { name, lastname, birthday, email, phonenumber, password, role } = req.body;
      const newUser = await UserModel.create({
        name,
        lastname,
        birthday,
        email,
        phonenumber,
        password,
        role,
      });

      const response = {
        error: false,
        message: "User created successfully.",
        user: newUser,
      };

      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
