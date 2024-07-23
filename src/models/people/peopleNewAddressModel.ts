import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/connection";

class PeopleNewAddress extends Model {}

PeopleNewAddress.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
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
    modelName: "PeopleNewAddress",
    tableName: "people_new_address",
    timestamps: true,
  },
);

export default PeopleNewAddress;
