import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config/connection";
import ShelterModel from "./shelterModel";

const UserModel = sequelize.define(
  "User",
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
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_shelter: {
      type: DataTypes.NUMBER,
      references: {
        model: "Shelter",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    modelName: "User",
    tableName: "users",
  },
);

export default UserModel;
