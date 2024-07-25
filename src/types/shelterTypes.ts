import ShelterAddress from "../models/shelter/shelterAddressModel";
interface ShelterAttributes {
  id: number;
  name: string;
  address: number;
  max_capacity: number;
  current_occupancy: number;
  amount_volunteers: number;
  id_admin_shelter?: number | null;
  ShelterAddress?: ShelterAddress;
}

export { ShelterAttributes };
