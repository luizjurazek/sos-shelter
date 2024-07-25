import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/connection";
import Shelter from "../shelter/shelterModel";

class ShelterAddress extends Model {}

ShelterAddress.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    complement: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "ShelterAddress",
    tableName: "shelter_address",
    timestamps: true,
  },
);

export default ShelterAddress;
