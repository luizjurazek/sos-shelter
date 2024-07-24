interface PeopleAttributes {
  id: number;
  name: string;
  birthday: Date;
  phonenumber?: string;
  old_address?: number | null;
  new_address?: number | null;
  cpf?: string | null;
  status: number;
  id_shelter?: number | null;
}

export { PeopleAttributes };
