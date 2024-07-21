import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection";
import ShelterModel from "./shelterModel";

class User extends Model {
  public id!: number;
  public name!: string;
  public lastname!: string;
  public birthday!: Date;
  public email!: string;
  public phonenumber!: string;
  public password!: string;
  public role!: string;
  public id_shelter!: number | null; // Permitir que id_shelter seja null

  // Definir associação com Shelter
  public readonly shelter?: ShelterModel;
}

User.init(
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
      type: DataTypes.INTEGER,
      allowNull: true, // Permitir que id_shelter seja null
      references: {
        model: "Shelter", // Nome do modelo referenciado
        key: "id", // Nome do campo na tabela Shelter
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "User",
    tableName: "users",
  },
);

export default User;
