// Type for User Model
interface UserAttributes {
  id: number;
  name: string;
  lastname: string;
  birthday: Date;
  email: string;
  phonenumber: string;
  password: string;
  role: number;
  id_shelter?: number | null;
}

export { UserAttributes };
