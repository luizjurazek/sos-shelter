import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/connection";

class User extends Model {}

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
