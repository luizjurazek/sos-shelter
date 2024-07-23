import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/connection";

class People extends Model {}

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
    phonenumber: {
      type: DataTypes.STRING,
    },
    old_address: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
      references: {
        model: "PeopleOldAddress",
        key: "id",
      },
    },
    new_address: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
      references: {
        model: "PeopleNewAddress",
        key: "id",
      },
    },
    cpf: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "PeopleStatus",
        key: "id",
      },
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

export default People;
