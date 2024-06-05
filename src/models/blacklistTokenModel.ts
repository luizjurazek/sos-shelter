import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection";

const BlacklistTokenModel = sequelize.define(
  "BlacklistToken",
  {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    modelName: "BlacklistToken",
    tableName: "BlacklistTokens",
  },
);

export default BlacklistTokenModel;
