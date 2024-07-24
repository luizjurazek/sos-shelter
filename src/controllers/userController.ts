import { Request, Response, NextFunction } from "express";
import User from "../models/user/userModel";
import bcrypt from "bcrypt";
import statusCode from "../utils/statusCode";
import { userValidatorData } from "../utils/userValidatorData";
import { CustomError } from "../types/errorTypes";

const UserModel = User;

class UserController {
  // method to get all users
  async getUsers(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to get all users'
    try {
      const allUsers = await UserModel.findAll();

      if (allUsers.length === 0) {
        const response: object = {
          error: true,
          message: "Users not found",
        };

        return res.status(statusCode.NOT_FOUND).json(response);
      } else {
        const response: object = {
          error: false,
          message: "Users founds successfully",
          users: allUsers,
        };

        return res.status(statusCode.OK).json(response);
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
        const response: object = {
          error: true,
          message: "User not found",
        };

        return res.status(statusCode.NOT_FOUND).json(response);
      } else {
        const response: object = {
          error: false,
          message: "User found successfully",
          user,
        };

        return res.status(statusCode.OK).json(response);
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
      const {
        name,
        lastname,
        birthday,
        email,
        phonenumber,
        role,
        id_shelter,
      }: { name: string; lastname: string; birthday: Date; email: string; phonenumber: string; role: number; id_shelter: number } = req.body;

      // Check if data is following the rules
      // const validateData: Array<string> | boolean = await userValidatorData(req.body);

      // if (validateData !== true) {
      //   const error: CustomError = new Error("Has erros while create a person");
      //   error.statusCode = statusCode.BAD_REQUEST;
      //   error.errors = validateData;
      //   throw error;
      // }

      const salt = bcrypt.genSaltSync(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const newUser = await UserModel.create({
        name,
        lastname,
        birthday,
        email,
        phonenumber,
        password,
        role,
        id_shelter,
      });

      if (newUser === null) {
        const response: object = {
          error: true,
          message: "Has a erro while creating a user",
        };

        return res.status(statusCode.BAD_REQUEST).json(response);
      } else {
        const response: object = {
          error: false,
          message: "User created successfully",
          user: newUser,
        };

        return res.status(statusCode.CREATED).json(response);
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
      const {
        id,
        name,
        lastname,
        birthday,
        email,
        phonenumber,
        password,
        role,
        id_shelter,
      }: {
        id: number;
        name: string;
        lastname: string;
        birthday: Date;
        email: string;
        phonenumber: string;
        password: string;
        role: number;
        id_shelter: number;
      } = req.body;

      // Check if data is following the rules
      // const validateData: Array<string> | boolean = await userValidatorData(req.body);

      // if (validateData !== true) {
      //   const error: CustomError = new Error("Has erros while create a person");
      //   error.statusCode = statusCode.BAD_REQUEST;
      //   error.errors = validateData;
      //   throw error;
      // }

      const user = await UserModel.findOne({ where: { id } });

      if (user != null) {
        await UserModel.update(
          { name, lastname, birthday, email, phonenumber, password, role, id_shelter },
          {
            where: { id },
            returning: true,
          },
        );

        const response: object = {
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

        return res.status(statusCode.OK).json(response);
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

      if (deletedUser === 0) {
        const response: object = {
          error: true,
          message: "Has a error while deleting a user",
          id,
        };

        res.status(statusCode.BAD_REQUEST).json(response);
      } else {
        const response: object = {
          error: false,
          message: "User deleted with successfully",
          id,
        };

        res.status(statusCode.OK).json(response);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
