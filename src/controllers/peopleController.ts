import People from "../models/peopleModel";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../types/errorTypes";
import { Op, literal } from "sequelize";
import peopleValidatorData from "../utils/peopleValidatorData";
import statusCode from "../utils/statusCode";
import Shelter from "../models/shelterModel";
import { updateCurrentOccupancyOnShelter, updateCurrentOccupancyOnAllShelter } from "../utils/updateCurrentOccupancyOnShelter";
import { checkVacancyOnShelter } from "../utils/checkVacancyOnshelter";

const ShelterModel = Shelter;
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

        return res.status(statusCode.NOT_FOUND).json(response);
      }

      const response: object = {
        error: false,
        message: "People found with succesfully",
        people,
      };

      return res.status(statusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  // enpoint to create a person
  async createPerson(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['People']
    // #swagger.description = 'Endpoint to create a people'
    try {
      const validateData: Array<string> | boolean = await peopleValidatorData(req.body);

      if (validateData !== true) {
        const error: CustomError = new Error("Has erros while create a person");
        error.statusCode = statusCode.BAD_REQUEST;
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

      const hasVacancyOnShelter: boolean = await checkVacancyOnShelter(id_shelter);

      if (!hasVacancyOnShelter) {
        const response: object = {
          error: true,
          message: "Hasnt vacancy on shelter, try other",
          id_shelter,
        };

        return res.status(statusCode.BAD_REQUEST).json(response);
      }

      const person: People | null = await PeopleModel.create({ name, birthday, contact, old_address, new_address, cpf, status, id_shelter });

      if (person === null) {
        const response: object = {
          error: true,
          message: "Has a erro while creating a person",
        };

        return res.status(statusCode.BAD_REQUEST).json(response);
      }

      const response: object = {
        error: false,
        message: "Person created with successfully",
        person,
      };

      // Do the update on current occupancy on shelter inserted
      const updateCurrentShelter = await updateCurrentOccupancyOnShelter(id_shelter);

      // if updateCurrentShelter return false update current occupancy in all  shelter table
      if (!updateCurrentShelter) {
        updateCurrentOccupancyOnAllShelter();
      }

      return res.status(statusCode.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  // Endpoint to get a person by id
  async getPersonById(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['People']
    // #swagger.description = 'Endpoint to get a person by id'
    try {
      const id: number = parseInt(req.params.id);
      const person: People | null = await PeopleModel.findByPk(id);
      console.log(person);
      if (person === null) {
        const response: object = {
          error: true,
          message: "Person not found",
          id,
        };

        return res.status(statusCode.NOT_FOUND).json(response);
      }

      const response: object = {
        error: false,
        message: "Person found with succesfully",
        person,
      };

      return res.status(statusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  // Endpoint to get people by shelter
  async getPeopleByShelter(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['People']
    // #swagger.description = 'Endpoint to get people by shelter'
    try {
      const id_shelter: number = parseInt(req.params.id);

      const shelter: Shelter | null = await ShelterModel.findByPk(id_shelter);

      if (shelter === null) {
        const response: object = {
          error: true,
          message: "Shelter not found",
          id_shelter,
        };

        return res.status(statusCode.NOT_FOUND).json(response);
      }

      const peopleOnShelter: Array<People> = await PeopleModel.findAll({
        where: {
          id_shelter,
        },
      });

      if (peopleOnShelter.length === 0) {
        const response: object = {
          error: false,
          message: "Hasnt people on shelter",
          shelter,
          peopleOnShelter,
        };

        return res.status(statusCode.OK).json(response);
      }

      const response: object = {
        error: false,
        massage: "People found with successfully on shelter",
        shelter,
        peopleOnShelter,
      };

      return res.status(statusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  // Endpoint to edit a person by id
  async editPerson(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['People']
    // #swagger.description = 'Endpoint to edit a person by id'
    try {
      const {
        id,
        name,
        birthday,
        contact,
        old_address,
        new_address,
        cpf,
        status,
        id_shelter,
      }: { id: number; name: string; birthday: Date; contact: string; old_address: object; new_address: object; cpf: string; status: number; id_shelter: number } = req.body;

      const person = await PeopleModel.findByPk(id);

      if (person === null) {
        const response: object = {
          error: true,
          message: "Person not found",
          id,
        };
        return res.status(statusCode.NOT_FOUND).json(response);
      }

      const hasVacancyOnShelter: boolean = await checkVacancyOnShelter(id_shelter);

      if (!hasVacancyOnShelter) {
        const response: object = {
          error: true,
          message: "Hasnt vacancy on shelter, try other",
          id_shelter,
        };

        return res.status(statusCode.BAD_REQUEST).json(response);
      }

      const personUpdate = await PeopleModel.update({ name, birthday, contact, old_address, new_address, cpf, status, id_shelter }, { where: { id } });
      if (personUpdate[0] === 0) {
        const response: object = {
          error: true,
          message: "Has an error whiler update person",
          person,
        };

        return res.status(statusCode.BAD_REQUEST).json(response);
      }

      const personBeforeUpdate = await PeopleModel.findByPk(id);

      const response: object = {
        error: false,
        message: "Person edited with succesfully",
        old_data_person: person,
        new_data_person: personBeforeUpdate,
      };

      // Do the update on current occupancy on shelter inserted
      const updateCurrentShelter = await updateCurrentOccupancyOnShelter(id_shelter);

      // if updateCurrentShelter return false update current occupancy in all  shelter table
      if (!updateCurrentShelter) {
        updateCurrentOccupancyOnAllShelter();
      }

      return res.status(statusCode.ACCEPTED).json(response);
    } catch (error) {
      next(error);
    }
  }

  // endpoint to get people by city
  async getPeopleByOldAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const address: string = req.params.address;

      const people: Array<People> = await PeopleModel.findAll({
        where: {
          [Op.or]: [
            literal(`JSON_UNQUOTE(JSON_EXTRACT(old_address, '$.street')) LIKE '%${address}%'`),
            literal(`JSON_UNQUOTE(JSON_EXTRACT(old_address, '$.city')) LIKE '%${address}%'`),
            literal(`JSON_UNQUOTE(JSON_EXTRACT(old_address, '$.state')) LIKE '%${address}%'`),
            literal(`JSON_UNQUOTE(JSON_EXTRACT(old_address, '$.zipcode')) LIKE '%${address}%'`),
          ],
        },
      });

      if (people.length === 0) {
        const response: object = {
          error: true,
          message: "People not found on address inserted",
          address,
        };
        return res.status(statusCode.NOT_FOUND).json(response);
      }

      const response: object = {
        error: true,
        message: "People found with successful on address inserted",
        address,
        people,
      };

      return res.status(statusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  // endpoint to delete a person
  async deletePerson(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['People']
    // #swagger.description = 'Endpoint to delete a person by id'
    try {
      const id: number = parseInt(req.params.id);
      const person: People | null = await PeopleModel.findByPk(id);

      if (person === null) {
        const response: object = {
          error: true,
          message: "Person not found",
          id,
        };
        return res.status(statusCode.NOT_FOUND).json(response);
      }

      const deletedPerson = await PeopleModel.destroy({
        where: {
          id,
        },
      });

      if (deletedPerson === 0) {
        const response: object = {
          error: true,
          message: "Has an error while delete person",
          person,
        };

        return res.status(statusCode.BAD_REQUEST).json(response);
      }

      const response: object = {
        error: false,
        message: "Person deleted with succesfully",
        person,
      };

      // Do the update on current occupancy on shelter inserted
      const updateCurrentShelter = await updateCurrentOccupancyOnShelter(person.dataValues.id_shelter);

      // if updateCurrentShelter return false update current occupancy in all  shelter table
      if (!updateCurrentShelter) {
        updateCurrentOccupancyOnAllShelter();
      }

      return res.status(statusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default PeopleController;
