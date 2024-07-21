import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection";

const BlacklistTokenModel = sequelize.define(
  "BlacklistToken",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    modelName: "BlacklistToken",
    tableName: "BlacklistTokens",
  },
);

export default BlacklistTokenModel;
