import { Request, Response, NextFunction, response } from "express";
import { Op } from "sequelize";

// import models
import Shelter from "../../models/shelter/shelterModel";
import PeopleModel from "../../models/people/peopleModel";
import ShelterAddress from "../../models/shelter/shelterAddressModel";
import UserModel from "../../models/user/userModel";

// Import utils
import { shelterValidatorData } from "../../utils/shelterValidatorData";
import { CustomError } from "../../types/errorTypes";
import statusCode from "../../utils/statusCode";

class ShelterController {
  // method to create a shelter
  async createShelter(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['Shelter']
    // #swagger.description = 'Endpoint to create a shelter'
    try {
      const {
        name,
        address,
        max_capacity,
        current_occupancy,
        amount_volunteers,
        id_admin_shelter,
      }: { name: string; address: number | null; max_capacity: number; current_occupancy: number; amount_volunteers: number; id_admin_shelter: number | null } = req.body;

      const shelterCreated = await Shelter.create({
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

        return res.status(statusCode.BAD_REQUEST).json(response);
      }

      const response: object = {
        error: false,
        message: "Shelter created with successfully",
        shelterCreated,
      };

      return res.status(statusCode.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  // method to get all shelters
  async getShelters(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['Shelter']
    // #swagger.description = 'Endpoint to get all Shelters'
    try {
      const allShelters = await Shelter.findAll({
        include: [
          {
            model: ShelterAddress,
            as: "ShelterAddress",
          },
        ],
      });

      if (allShelters.length === 0) {
        const response: object = {
          error: true,
          message: "Shelters not found",
        };

        return res.status(statusCode.NOT_FOUND).json(response);
      }

      const response: object = {
        error: false,
        message: "Shelters found with successfully",
        shelters: allShelters,
      };

      return res.status(statusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getShelterById(req: Request, res: Response, next: NextFunction) {
    try {
      const id_shelter: number = parseInt(req.params.id);
      const shelter = await Shelter.findByPk(id_shelter, {
        include: [
          {
            model: ShelterAddress,
            as: "ShelterAddress",
          },
          {
            model: UserModel,
            as: "ShelterAdmin",
          },
        ],
      });

      console.log(shelter);
      if (shelter === null) {
        const response: object = {
          error: true,
          message: "Shelter not found",
          id_shelter,
        };

        return res.status(statusCode.NOT_FOUND).json(response);
      }

      const response: object = {
        error: false,
        message: "Shelter found with successfull",
        id_shelter,
        shelter,
      };

      return res.status(statusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  // method to get shelters by city
  async getSheltersByCity(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['Shelter']
    // #swagger.description = 'Endpoint to get all shelters by city'
    const cityName: string = req.params.city.toString();

    const sheltersInCity: Array<Shelter> = await Shelter.findAll({
      include: [
        {
          model: ShelterAddress,
          as: "ShelterAddress",
          where: { city: { [Op.like]: `${cityName}` } },
        },
      ],
    });

    if (sheltersInCity.length === 0) {
      const response: object = {
        error: true,
        message: "Shelters not found",
        city: cityName,
      };

      return res.status(statusCode.NOT_FOUND).json(response);
    }

    const response: object = {
      error: false,
      message: "Shelters found with successfull",
      city: cityName,
      sheltersInCity,
    };

    return res.status(statusCode.OK).json(response);
  }

  // Method to edit a shelter
  async editShelter(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['Shelter']
    // #swagger.description = 'Endpoint to edit a shelter'

    // Case data isnt validated throw an error
    try {
      const validateData = await shelterValidatorData(req.body);
      if (validateData !== true) {
        const error: CustomError = new Error("Has errors on data ");
        error.statusCode = statusCode.BAD_REQUEST;
        error.errors = validateData;
        throw error;
      }

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
        address: number;
        max_capacity: number;
        current_occupancy: number;
        amount_volunteers: number;
        id_admin_shelter: number;
      } = req.body;

      const shelter = await Shelter.findByPk(id);

      // case shelter is not found in bd return and error
      if (shelter === null) {
        const response: object = {
          error: true,
          message: "Shelter not found",
          id,
        };

        return res.status(statusCode.NOT_FOUND).json(response);
      }

      const shelterUpdate = await Shelter.update({ name, address, max_capacity, current_occupancy, amount_volunteers, id_admin_shelter }, { where: { id }, returning: false });

      if (shelterUpdate[0] !== 1) {
        const response: object = {
          error: true,
          message: "Has an error while update the shelter, try again",
        };

        return res.status(statusCode.BAD_REQUEST).json(response);
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

      return res.status(statusCode.OK).json(response);
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

        return res.status(statusCode.BAD_REQUEST).json(response);
      }

      const shelter = await Shelter.findByPk(id);
      const shelterData = shelter?.dataValues;

      const deletedShelter = await Shelter.destroy({
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
        return res.status(statusCode.BAD_REQUEST).json(response);
      }

      const response: object = {
        error: false,
        massage: "Shelter deleted with successfully",
        shelter: shelterData,
      };

      return res.status(statusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default ShelterController;
