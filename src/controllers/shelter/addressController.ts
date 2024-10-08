import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../types/errorTypes";
import statusCode from "../../utils/statusCode";

import ShelterAddress from "../../models/shelter/shelterAddressModel";

export default class AddressController {
  // Method to create a new shelter address
  async createShelterAddress(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags = ['Address']
    // #swagger.description = 'Endpoint to create a new shelter address'
    const {
      country,
      state,
      city,
      street,
      zipcode,
      number,
      complement,
    }: {
      country: string;
      state: string;
      city: string;
      street: string;
      zipcode: string;
      number: string;
      complement: string;
    } = req.body;

    try {
      const address = await ShelterAddress.create({
        country,
        state,
        city,
        street,
        zipcode,
        number,
        complement,
      });

      if (address === null) {
        const response: object = {
          error: true,
          message: "Has an error while creating the address",
        };

        return res.status(statusCode.BAD_REQUEST).json(response);
      }

      return res.status(statusCode.OK).json(address);
    } catch (error) {
      next(error);
    }
  }
}
