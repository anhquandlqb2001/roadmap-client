import { TErrorResponseFromServer } from "./types";

const errorsMap = (errors: TErrorResponseFromServer[]) => {
  const errorFields: Record<string, string> = {};
  errors.map((field) => {
    errorFields[field.name] = field.error;
  });
  return errorFields;
};

export default errorsMap;
