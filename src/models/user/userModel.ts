import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../../config/connection";

import Shelter from "../shelter/shelterModel";

// Interface para os atributos do User
interface UserAttributes {
  id: number;
  name: string;
  lastname: string;
  birthday: Date;
  email: string;
  phonenumber: string;
  password: string;
  role: number;
  id_shelter?: number | null; // Tornar opcional já que pode ser null
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public lastname!: string;
  public birthday!: Date;
  public email!: string;
  public phonenumber!: string;
  public password!: string;
  public role!: number;
  public id_shelter?: number | null;
}

// class User extends Model {}

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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "UserRole",
        key: "id",
      },
    },
    id_shelter: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Shelter",
        key: "id",
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
