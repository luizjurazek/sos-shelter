import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/connection";

class BlacklistToken extends Model {}

BlacklistToken.init(
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
    sequelize,
    timestamps: true,
    modelName: "BlacklistToken",
    tableName: "blacklist_tokens",
  },
);

export default BlacklistToken;
