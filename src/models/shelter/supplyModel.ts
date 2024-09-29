import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connection";
import ShelterModel from "./shelterModel";

const SupplyModel = sequelize.define(
  "Supply",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_shelter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Shelter",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    modelName: "Supply",
    tableName: "supplies",
  },
);

SupplyModel.belongsTo(ShelterModel, {
  foreignKey: "id_shelter",
  as: "ShelterSupply",
});

export default SupplyModel;
