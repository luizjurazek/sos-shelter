import People from "../models/peopleModel";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../types/errorTypes";
import peopleValidatorData from "../utils/peopleValidatorData";

const PeopleModel = People;

class PeopleController {
  // Endpoint to get all people
  async getPeople(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['People']
    // #swagger.description = 'Endpoint to get all people'
    try {
      const people: People[] = await PeopleModel.findAll();

      if (people.length === 0) {
        const response: object = {
          error: true,
          message: "People not found",
        };

        return res.status(404).json(response);
      }

      const response: object = {
        error: false,
        message: "People found with succesfully",
        people,
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // enpoint to create a person
  async createPerson(req: Request, res: Response, next: NextFunction) {
    try {
      const validateData: Array<string> | boolean = await peopleValidatorData(req.body);

      if (validateData !== true) {
        const error: CustomError = new Error("Has erros while create a person");
        error.statusCode = 400;
        error.errors = validateData;
        throw error;
      }

      const {
        name,
        birthday,
        contact,
        old_address,
        new_address,
        cpf,
        status,
        id_shelter,
      }: { name: string; birthday: Date; contact: string; old_address: object; new_address: object; cpf: string; status: number; id_shelter: number } = req.body;

      const person: People | null = await PeopleModel.create({ name, birthday, contact, old_address, new_address, cpf, status, id_shelter });

      if (person === null) {
        const response: object = {
          error: true,
          message: "Has a erro while creating a person",
        };

        return res.status(400).json(response);
      }

      const response: object = {
        error: false,
        message: "Person created with successfully",
        person,
      };

      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default PeopleController;
