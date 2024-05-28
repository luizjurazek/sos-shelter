import { Request, Response, NextFunction } from "express";
import { sequelize } from "../config/connection";
import User from "../model/userModel";

const UserModel = User(sequelize);

class UserController {
  // method to create a new user
  async createUser(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to create a user'
    try {
      const { name, lastname, birthday, email, phonenumber, password, role } = req.body;
      const newUser = UserModel.create({
        name,
        lastname,
        birthday,
        email,
        phonenumber,
        password,
        role,
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
