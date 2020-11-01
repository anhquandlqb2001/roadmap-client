import React from "react";
import { ValidateField, ValidateFields } from "../../components/LoginForm";

interface ErrorType extends ValidateField {
  name: "email" | "password";
};

const formError = (
  errors: ErrorType[],
  setValidateField: React.Dispatch<React.SetStateAction<ValidateFields>>
) => {
  const errorFields: Record<string, object> = {}
  errors.map((field) => {
    errorFields[field.name] = {
      errors: field.errors[0],
      validateStatus: field.validateStatus
    }
  });
  setValidateField((errorFields as any))
};

export default formError;
