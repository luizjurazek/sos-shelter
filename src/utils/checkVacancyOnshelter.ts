import Shelter from "../models/shelter/shelterModel";

async function checkVacancyOnShelter(id_shelter: number): Promise<boolean> {
  const shelter: Shelter | null = await Shelter.findByPk(id_shelter);

  if (shelter === null) {
    return false;
  }

  const { max_capacity, current_occupancy }: { max_capacity: number; current_occupancy: number } = shelter.dataValues;
  const vacancy: number = max_capacity - current_occupancy;

  if (vacancy === 0) {
    return false;
  }

  return true;
}

export { checkVacancyOnShelter };
