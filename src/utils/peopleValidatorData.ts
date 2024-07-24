import { PeopleAttributes } from "../types/peopleTypes";

async function peopleValidatorData(data: PeopleAttributes) {
  const errors: Array<string> = [];

  if (data.id) {
    if (data.id === undefined || typeof data.id !== "number") {
      errors.push("id must be filled and a number");
    }
  }

  if (data.name === undefined || typeof data.name !== "string") {
    errors.push("name must be filled and a string");
  }

  // regex for birthday
  // ^(19\d{2}|20\d{2}|2100)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$
  if (data.birthday === undefined || typeof data.birthday !== "string") {
    errors.push("birthday must be filled and a string");
  }

  if (typeof data.phonenumber !== "string") {
    errors.push("contact must be a string");
  }

  const contactRegex: string = "^\\(\\d{2}\\)\\d{5}-\\d{4}$";
  if (!data.phonenumber?.match(contactRegex)) {
    errors.push("contact need to have the following pattern: (xx)xxxxx-xxxx");
  }

  if (typeof data.old_address !== "number") {
    errors.push("old address must be an number ");
  }

  if (typeof data.new_address !== "number") {
    errors.push("new address must be an number ");
  }

  if (typeof data.cpf !== "string") {
    errors.push("cpf must be a string ");
  }

  if (typeof data.status !== "number") {
    errors.push("cpf must be a number ");
  }
  if (typeof data.id_shelter !== "number") {
    errors.push("number must be a number ");
  }

  if (errors.length > 0) {
    return errors;
  }

  return true;
}

export default peopleValidatorData;
