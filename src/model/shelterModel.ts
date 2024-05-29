import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection";
import UserModel from "../model/userModel";

const ShelterModel = sequelize.define(
  "Shelter",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adress: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    max_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    current_ocuppancy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    amount_volunteers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    id_admin_shelter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    modelName: "Shelter",
    tableName: "shelters",
  },
);

ShelterModel.belongsTo(UserModel, {
  foreignKey: "id_admin_shelter",
});

export default ShelterModel;
