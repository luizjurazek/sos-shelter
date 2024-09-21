import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../../config/connection";
import ShelterAddress from "../shelter/shelterAddressModel";
import { ShelterAttributes } from "../../types/shelterTypes";
import User from "../user/userModel";

interface ShelterCreationAttributes extends Optional<ShelterAttributes, "id"> {}

class Shelter extends Model<ShelterAttributes, ShelterCreationAttributes> implements ShelterAttributes {
  public id!: number;
  public name!: string;
  public address!: number;
  public max_capacity!: number;
  public current_occupancy!: number;
  public amount_volunteers!: number;
  public id_admin_shelter?: number | null;
  public ShelterAddress?: ShelterAddress;
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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ShelterAddress",
        key: "id",
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
        model: "User",
        key: "id",
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

Shelter.belongsTo(ShelterAddress, { foreignKey: "address", as: "ShelterAddress" });
Shelter.belongsTo(User, { foreignKey: "id_admin_shelter", as: "ShelterAdmin" });

export default Shelter;
