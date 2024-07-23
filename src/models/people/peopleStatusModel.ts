import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/connection";

class PeopleStatus extends Model {}

PeopleStatus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PeopleStatus",
    tableName: "people_status",
    timestamps: true,
  },
);

export default PeopleStatus;
