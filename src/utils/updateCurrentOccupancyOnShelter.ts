import Shelter from "../models/shelterModel";
import People from "../models/peopleModel";

async function updateCurrentOccupancyOnAllShelter() {
  const shelters = await Shelter.findAll();
  const shelterIds = shelters.map((shelter) => shelter.dataValues.id);

  // const people = await People.findAll();

  shelterIds.forEach(async (id) => {
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

async function updateCurrentOccupancyOnShelter(id_shelter: number) {
  const peopleOnShelter: number = await People.count({
    where: {
      id_shelter,
    },
  });

  const shelterUpdated = await Shelter.update({ current_occupancy: peopleOnShelter }, { where: { id: id_shelter } });

  if (shelterUpdated[0] !== 1) {
    return false;
  }
  return true;
}

export { updateCurrentOccupancyOnAllShelter, updateCurrentOccupancyOnShelter };
