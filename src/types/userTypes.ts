import { Model, Optional } from "sequelize";

// Type for User Model
interface UserAttributes {
  id?: number;
  name: string;
  lastname: string;
  birthday: Date;
  email: string;
  phonenumber: string;
  password: string;
  role: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public lastname!: string;
  public birthday!: Date;
  public email!: string;
  public phonenumber!: string;
  public password!: string;
  public role!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export { UserModel, UserAttributes };
