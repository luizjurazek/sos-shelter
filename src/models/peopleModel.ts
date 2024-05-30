import DataTypes from "sequelize";
import { sequelize } from "../config/connection";
import ShelterModel from "./shelterModel";

const PeopleModel = sequelize.define(
  "People",
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
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
    },
    old_adress: {
      type: DataTypes.JSON,
      defaultValue: null,
    },
    new_adress: {
      type: DataTypes.JSON,
      defaultValue: null,
    },
    cpf: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
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
    timestamps: true,
    modelName: "People",
    tableName: "peoples",
  },
);

PeopleModel.belongsTo(ShelterModel, {
  foreignKey: "id_shelter",
});

export default PeopleModel;
