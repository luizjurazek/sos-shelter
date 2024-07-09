import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/connection";
import ShelterModel from "./shelterModel";

class People extends Model {
  public id!: number;
  public name!: string;
  public birthday!: Date;
  public contact?: string;
  public old_address?: object;
  public new_address?: object;
  public cpf?: string;
  public status!: string;
  public id_shelter?: number;
}

People.init(
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
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
    },
    old_address: {
      type: DataTypes.JSON,
      defaultValue: null,
      get() {
        const rawValue = this.getDataValue("old_address");
        return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
      },
    },
    new_address: {
      type: DataTypes.JSON,
      defaultValue: null,
      get() {
        const rawValue = this.getDataValue("new_address");
        return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
      },
    },
    cpf: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_shelter: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      references: {
        model: "Shelter",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "People",
    tableName: "people",
  },
);

People.belongsTo(ShelterModel, {
  foreignKey: "id_shelter",
});

export default People;
