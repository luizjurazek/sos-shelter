import { Model, Optional } from "sequelize";

interface ShelterAttributes {
  id: number;
  name: string;
  adress: JSON;
  max_capacity: number;
  current_ocuppancy: number;
  amount_volunteers: number;
  id_admin_shelter: number;
}

interface ShelterCreationAttributes extends Optional<ShelterAttributes, "id"> {}

class ShelterModel extends Model<ShelterAttributes, ShelterCreationAttributes> implements ShelterAttributes {
  public id!: number;
  public name!: string;
  public adress!: JSON;
  public max_capacity!: number;
  public current_ocuppancy!: number;
  public amount_volunteers!: number;
  public id_admin_shelter!: number;
}

export { ShelterModel, ShelterAttributes };
