import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

type MyButtonProps = ButtonProps & {
  loading: boolean;
  label: string;
  icon?: any;
};

const MyButton: React.FC<MyButtonProps> = ({
  icon,
  label,
  loading,
  type,
  onClick,
  ...props
}) => {
  let extend;
  if (icon) {
    extend = !loading && icon;
  }

  return (
    <Button
      {...props}
      type={type}
      variant="contained"
      onClick={onClick}
      disabled={loading}
    >
      {loading && <CircularProgress size={30} />}
      {extend}
      {label}
    </Button>
  );
};

export default MyButton;
