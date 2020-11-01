const errorsMap = (errors) => {
  const errorFields: Record<string, object> = {};
  errors.map((field) => {
    errorFields[field.name] = {
      errors: field.errors[0],
      validateStatus: field.validateStatus,
    };
  });
  return errorFields;
};

export default errorsMap;
