import { TextField, TextFieldProps } from "@material-ui/core";
import { useField } from "formik";

type InputFieldProps = TextFieldProps & {
  label: string;
};
const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props as any);

  return (
    <TextField
      placeholder={label}
      label={error}
      error={!!error}
      id={props.name}
      {...props}
      {...field}
    />
  );
};

export default InputField;
