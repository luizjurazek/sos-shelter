import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection";
import UserModel from "./userModel";

class Shelter extends Model {
  public id!: number;
  public name!: string;
  public address!: object;
  public max_capacity!: number;
  public current_occupancy!: number;
  public amount_volunteers!: number;
  public id_admin_shelter!: number;

  // Definir associação com User
  public readonly admin?: UserModel;
}

Shelter.init(
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
    address: {
      type: DataTypes.JSON,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("address");
        return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
      },
    },
    max_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    current_occupancy: {
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
      allowNull: true,
      references: {
        model: "User", // Nome do modelo referenciado
        key: "id", // Nome do campo na tabela User
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Shelter",
    tableName: "shelters",
  },
);

export default Shelter;
