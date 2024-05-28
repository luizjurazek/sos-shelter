import { DataTypes, Sequelize } from "sequelize";
import { ShelterModel } from "../types/shelterTypes";

export default (sequelize: Sequelize) => {
  ShelterModel.init(
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
      sequelize,
      modelName: "Shelter",
      tableName: "shelters",
    },
  );

  ShelterModel.belongsTo(sequelize.models.User, {
    foreignKey: "id_admin_shelter",
  });

  return ShelterModel;
};
