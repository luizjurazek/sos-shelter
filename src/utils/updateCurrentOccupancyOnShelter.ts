import Shelter from "../models/shelter/shelterModel";
import People from "../models/people/peopleModel";

async function updateCurrentOccupancyOnAllShelter(): Promise<boolean> {
  const shelters: Array<Shelter> = await Shelter.findAll();
  const shelterIds: Array<number> = shelters.map((shelter) => shelter.dataValues.id);

  shelterIds.forEach(async (id: number) => {
    const peopleOnShelter: number = await People.count({
      where: {
        id_shelter: id,
      },
    });

    // criar verificacao se foi atualizado
    await Shelter.update({ current_occupancy: peopleOnShelter }, { where: { id } });
  });

  return true;
}

async function updateCurrentOccupancyOnShelter(id_shelter: number): Promise<boolean> {
  const peopleOnShelter: number = await People.count({
    where: {
      id_shelter,
    },
  });

  const shelterUpdated: Array<number> = await Shelter.update({ current_occupancy: peopleOnShelter }, { where: { id: id_shelter } });

  if (shelterUpdated[0] !== 1) {
    return false;
  }
  return true;
}

export { updateCurrentOccupancyOnAllShelter, updateCurrentOccupancyOnShelter };
