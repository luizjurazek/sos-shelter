import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/connection";

class UserRole extends Model {}

UserRole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "UserRole",
    tableName: "user_role",
    timestamps: true,
  },
);

export default UserRole;
