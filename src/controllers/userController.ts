import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

const UserModel = User;

class UserController {
  // method to get all users
  async getUsers(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to get all users'
    try {
      const allUsers = await UserModel.findAll();

      if (allUsers.length === 0) {
        const response = {
          error: true,
          message: "Users not found",
        };

        return res.status(404).json(response);
      } else {
        const response = {
          error: false,
          message: "Users founds successfully",
          users: allUsers,
        };

        return res.status(200).json(response);
      }
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

      if (user === null) {
        const response = {
          error: true,
          message: "User not found",
        };

        return res.status(404).json(response);
      } else {
        const response = {
          error: false,
          message: "User found successfully",
          user,
        };

        return res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  // method to create a new user
  async createUser(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to create a user'
    try {
      const { name, lastname, birthday, email, phonenumber, password, role }: { name: string; lastname: string; birthday: Date; email: string; phonenumber: string; password: string; role: string } =
        req.body;

      const newUser = await UserModel.create({
        name,
        lastname,
        birthday,
        email,
        phonenumber,
        password,
        role,
      });

      if (newUser === null) {
        const response = {
          error: true,
          message: "Has a erro while creating a user",
        };

        return res.status(400).json(response);
      } else {
        const response = {
          error: false,
          message: "User created successfully",
          user: newUser,
        };

        return res.status(201).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  // method to edit a new user
  async editUser(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to edit a user'
    try {
      const { id, name, lastname, birthday, email, phonenumber, password, role } = req.body;

      const user = await UserModel.findOne({ where: { id } });

      if (user != null) {
        await UserModel.update(
          { name, lastname, birthday, email, phonenumber, password, role },
          {
            where: { id },
            returning: true,
          },
        );

        const response = {
          error: false,
          message: "User edited with successfully",
          old_data_user: user.dataValues,
          new_data_user: {
            name,
            lastname,
            birthday,
            email,
            phonenumber,
            password,
            role,
          },
        };

        return res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  // Method to delete a user
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to delete a user'
    try {
      const id = req.params.id;

      const deletedUser = await UserModel.destroy({
        where: {
          id,
        },
      });

      console.log(deletedUser);
      if (deletedUser === 0) {
        const response = {
          error: true,
          message: "Has a error while deleting a user",
          id,
        };

        res.status(400).json(response);
      } else {
        const response = {
          error: false,
          message: "User deleted with successfully",
          id,
        };

        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
