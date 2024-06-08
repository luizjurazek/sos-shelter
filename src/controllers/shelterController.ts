import { Request, Response, NextFunction } from "express";
import Shelter from "../models/shelterModel";
import { Op, literal } from "sequelize";

const ShelterModel = Shelter;

class ShelterController {
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

  async createShelter(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, address, max_capacity, current_occupancy, amount_volunteers, id_admin_shelter } = req.body;

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
}

export default ShelterController;
