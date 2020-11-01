import { FormHelperText } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Input, { InputProps } from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { useField } from "formik";
import React from "react";

interface InputFieldProps extends InputProps {
  label: string;
}
const InputField = ({ label, ...props }: InputFieldProps) => {
  const [field, { error }] = useField(props as any);

  return (
    <FormControl error={!!error} >
      <InputLabel htmlFor={props.name}>{label}</InputLabel>
      <Input id={props.name} {...props} {...field} />
      {error && <FormHelperText>{(error as any).errors}</FormHelperText>}
    </FormControl>
  );
};

export default InputField;
