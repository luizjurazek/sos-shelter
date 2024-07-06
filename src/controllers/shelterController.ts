import { Request, Response, NextFunction } from "express";
import Shelter from "../models/shelterModel";
import { Op, literal } from "sequelize";
import PeopleModel from "../models/peopleModel";
import { shelterValidatorData } from "../utils/shelterValidatorData";
import { CustomError } from "../types/errorTypes";

const ShelterModel = Shelter;

class ShelterController {
  // method to create a shelter
  async createShelter(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['Shelter']
    // #swagger.description = 'Endpoint to create a shelter'
    try {
      // Case data isnt validated throw an error
      const validateData = await shelterValidatorData(req.body);
      if (validateData !== true) {
        const error: CustomError = new Error("Has errors on data ");
        error.statusCode = 400;
        error.errors = validateData;
        throw error;
      }

      const {
        name,
        address,
        max_capacity,
        current_occupancy,
        amount_volunteers,
        id_admin_shelter,
      }: { name: string; address: string; max_capacity: number; current_occupancy: number; amount_volunteers: number; id_admin_shelter: number } = req.body;

      const shelterCreated = await ShelterModel.create({
        name,
        address,
        max_capacity,
        current_occupancy,
        amount_volunteers,
        id_admin_shelter,
      });

      if (shelterCreated === null) {
        const response: object = {
          error: true,
          message: "Has a erro while creating a shelter",
        };

        return res.status(400).json(response);
      }

      const response: object = {
        error: false,
        message: "Shelter created with successfully",
        shelterCreated,
      };

      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  // method to get all shelters
  async getShelters(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['Shelter']
    // #swagger.description = 'Endpoint to get all Shelters'
    try {
      const allShelters = await ShelterModel.findAll();

      if (allShelters.length === 0) {
        const response: object = {
          error: true,
          message: "Shelters not found",
        };

        return res.status(404).json(response);
      }

      const response: object = {
        error: false,
        message: "Shelters found with successfully",
        shelters: allShelters,
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // method to get shelters by city
  async getSheltersByCity(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['Shelter']
    // #swagger.description = 'Endpoint to get all shelters by city'
    try {
      const city: string = req.params.city;

      const shelters = await ShelterModel.findAll({
        where: {
          [Op.and]: [literal(`JSON_UNQUOTE(JSON_EXTRACT(address, '$.city')) LIKE '%${city}%'`)],
        },
      });

      if (shelters.length === 0) {
        const response: object = {
          error: true,
          message: "Shelters not found",
          city,
        };

        return res.status(404).json(response);
      }

      const response: object = {
        error: false,
        message: "Shelters found with successfully",
        city,
        shelters,
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // method to delete a shelter
  async deleteShelter(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['Shelter']
    // #swagger.description = 'Endpoint to delete a shelter'
    try {
      const id: number = req.body.id;

      const peoplesInShelter = await PeopleModel.findAll({
        where: {
          id_shelter: id,
        },
      });

      if (peoplesInShelter.length !== 0) {
        const response: object = {
          error: true,
          message: "Has one or more people on Shelter that you want to delete",
        };

        return res.status(400).json(response);
      }

      const shelter = await ShelterModel.findByPk(id);
      const shelterData = shelter?.dataValues;

      const deletedShelter = await ShelterModel.destroy({
        where: {
          id,
        },
      });

      if (deletedShelter !== 1) {
        const response: object = {
          error: true,
          message: "Has an error while deleting the shelter",
          shelter: shelterData,
        };
        return res.status(400).json(response);
      }

      const response: object = {
        error: false,
        massage: "Shelter deleted with successfully",
        shelter: shelterData,
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // Method to edit a shelter
  async editShelter(req: Request, res: Response, next: NextFunction) {
    const {
      id,
      name,
      address,
      max_capacity,
      current_occupancy,
      amount_volunteers,
      id_admin_shelter,
    }: {
      id: number;
      name: string;
      address: JSON;
      max_capacity: number;
      current_occupancy: number;
      amount_volunteers: number;
      id_admin_shelter: number;
    } = req.body;

    const shelter = await ShelterModel.findByPk(id);

    // case shelter is not found in bd return and error
    if (shelter === null) {
      const response: object = {
        error: true,
        message: "Shelter not found",
        id,
      };

      return res.status(404).json(response);
    }

    const shelterUpdate = await ShelterModel.update({ name, address, max_capacity, current_occupancy, amount_volunteers, id_admin_shelter }, { where: { id }, returning: false });

    if (shelterUpdate[0] !== 1) {
      const response: object = {
        error: true,
        message: "Has an error while update the shelter, try again",
      };

      return res.status(400).json(response);
    }

    const response: object = {
      error: false,
      message: "Shelter updated with succesfully",
      old_data_shelter: shelter.dataValues,
      new_data_shelter: {
        name,
        address,
        max_capacity,
        current_occupancy,
        amount_volunteers,
        id_admin_shelter,
      },
    };

    return res.status(200).json(response);
  }
}

export default ShelterController;
