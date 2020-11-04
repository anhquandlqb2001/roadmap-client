const errorsMap = (errors) => {
  const errorFields: Record<string, string> = {};
  errors.map((field) => {
    errorFields[field.name] = field.error;
  });
  return errorFields;
};

export default errorsMap;
