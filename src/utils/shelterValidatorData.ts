import { ShelterAttributes } from "../types/shelterTypes";

async function shelterValidatorData(data: ShelterAttributes) {
  const errors: Array<string> = [];

  if (data.id) {
    if (data.id === undefined || typeof data.id !== "number") {
      errors.push("Id must be filled and a number");
    }
  }

  if (data.name === undefined || typeof data.name !== "string") {
    errors.push("Name must be filled and a string");
  }

  if (data.address === undefined || typeof data.address !== "object") {
    errors.push("address must be filled and an object");
  }

  if (data.max_capacity === undefined || typeof data.max_capacity !== "number") {
    errors.push("max_capacity must be filled and a number");
  }

  if (data.current_occupancy === undefined || typeof data.current_occupancy !== "number") {
    errors.push("current_ocuppancy must be filled and a number");
  }
  if (data.amount_volunteers === undefined || typeof data.amount_volunteers !== "number") {
    errors.push("amount_volunteers must be filled and a number");
  }
  if (data.id_admin_shelter === undefined || typeof data.id_admin_shelter !== "number") {
    errors.push("id_admin_shelter must be filled and a number");
  }

  if (errors.length > 0) {
    return errors;
  }

  return true;
}

export { shelterValidatorData };
