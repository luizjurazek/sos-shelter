import { Request, Response, NextFunction } from "express";

import { CustomError } from "../../types/errorTypes";
import statusCode from "../../utils/statusCode";

import SupplyModel from "../../models/shelter/supplyModel";
import Shelter from "../../models/shelter/shelterModel";

export default class SupplyController {
  async getSupplyByShelter(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['Shelter']
    // #swagger.description = 'Endpoint to create a shelter'

    try {
      const id_shelter: number = req.body.id;
      const shelterExist = await Shelter.findByPk(id_shelter);

      if (shelterExist === null) {
        const response: object = {
          error: true,
          message: "Shelter not found.",
          id_shelter,
        };

        return res.status(statusCode.BAD_REQUEST).json(response);
      }

      const data = await SupplyModel.findAll({
        where: {
          id_shelter,
        },
      });

      if (data.length === 0) {
        const response: object = {
          error: true,
          message: "Supplies not found.",
        };

        return res.status(statusCode.NOT_FOUND).json(response);
      }

      const response: object = {
        error: false,
        message: "Supplies found with successfully.",
        supplies: data,
      };

      return res.status(statusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}
