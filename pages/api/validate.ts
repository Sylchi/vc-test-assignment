import { NextApiRequest, NextApiResponse } from "next";
import { userType } from "./user";

export type userParameter = 'firstName' | 'lastName' | 'email' | 'password'

export type validationResult = {
  isValid: boolean,
  fieldName?: userParameter,
  message?: string
}

export const regex = {
  firstName: "^[A-Za-zÁÉÍÓÚáéíóúñÑ\\x20-]{1,25}$", // Really depends where someone is from
  lastName: "^[A-Za-zÁÉÍÓÚáéíóúñÑ\\x20-]{1,25}$",
  email: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]{2,}$",
  password: "^.{8,32}$"
}

export const validateSingle = (parameterName: userParameter, value: string) => {
  return { isValid: !!value && typeof value === 'string' && new RegExp(regex[parameterName]).test(value) };
}

export const validateMany = (userData: userType) => {
  for(const fieldName of ['firstName', 'lastName', 'email', 'password'] as Array<userParameter>){
    if(!validateSingle(fieldName, userData[fieldName]).isValid) return { isValid: false, fieldName }
  }
  return { isValid: true }
}

/*
  We are currently not using this function as we only validate using regex and we 
  are currently using the same regex in the front end
*/
const Validate = (req: NextApiRequest, res: NextApiResponse) => {
  res.json(validateMany(req.body));
}

export default Validate;