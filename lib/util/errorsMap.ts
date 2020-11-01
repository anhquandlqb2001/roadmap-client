const errorsMap = (errors) => {
  const errorFields: Record<string, string> = {};
  errors.map((field) => {
    errorFields[field.name] = field.errors;
  });
  console.log(errorFields);
  
  return errorFields;
};

export default errorsMap;
