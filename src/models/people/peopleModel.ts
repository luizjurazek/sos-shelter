import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/connection";

import PeopleNewAddress from "./peopleNewAddressModel";
import PeopleOldAddress from "./peopleOldAddressModel";
import PeopleStatus from "./peopleStatusModel";
import Shelter from "../shelter/shelterModel";

class People extends Model {}

People.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
    },
    old_address: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
      references: {
        model: "PeopleOldAddress",
        key: "id",
      },
    },
    new_address: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
      references: {
        model: "PeopleNewAddress",
        key: "id",
      },
    },
    cpf: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "PeopleStatus",
        key: "id",
      },
    },
    id_shelter: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      references: {
        model: "Shelter",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "People",
    tableName: "people",
  },
);

People.belongsTo(Shelter, { foreignKey: "id_shelter", as: "PeopleShelter" });
People.belongsTo(PeopleStatus, { foreignKey: "status", as: "PeopleStatus" });
People.belongsTo(PeopleOldAddress, { foreignKey: "old_address", as: "PeopleOldAddress" });
People.belongsTo(PeopleNewAddress, { foreignKey: "new_address", as: "PeopleNewAddress" });

export default People;
