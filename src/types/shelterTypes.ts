interface ShelterAttributes {
  id: number;
  name: string;
  adress: JSON;
  max_capacity: number;
  current_ocuppancy: number;
  amount_volunteers: number;
  id_admin_shelter: number;
}

export { ShelterAttributes };
