import { UserAttributes } from "../types/userTypes";

async function userValidatorData(data: UserAttributes) {
  const errors: Array<string> = [];

  if (data.id) {
    if (!data.id || typeof data.id !== "number") {
      errors.push("id must be filled and a number");
    }
  }

  if (!data.name || typeof data.name !== "string") {
    errors.push("name must be filled and a string");
  }

  if (!data.lastname || typeof data.lastname !== "string") {
    errors.push("lastname must be filled and a string");
  }

  if (!data.birthday || typeof data.birthday !== "string") {
    errors.push("birthday must be filled and a string");
  }

  if (!data.email || typeof data.email !== "string") {
    errors.push("email must be filled and a string");
  }

  if (!data.phonenumber || typeof data.phonenumber !== "string") {
    errors.push("phonenumber must be filled and a string");
  }

  const phonenumberRegex: string = "^\\(\\d{2}\\)\\d{5}-\\d{4}$";
  if (!data.phonenumber?.match(phonenumberRegex)) {
    errors.push("phonenumber need to have the following pattern: (xx)xxxxx-xxxx");
  }

  // if (!data.role || typeof data.role !== "number") {
  //   errors.push("role must be filled and a number");
  // }

  // if (!data.id_shelter || typeof data.id_shelter !== "number") {
  //   errors.push("id_shelter must be filled and a number");
  // }

  if (errors.length > 0) {
    return errors;
  }

  return true;
}

export { userValidatorData };
