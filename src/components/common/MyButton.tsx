import React from "react";
import Button, {ButtonProps} from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

type MyButtonProps = ButtonProps & {
  loading: boolean;
  label: string
  icon?: any
};

const MyButton = ({ icon, label, loading, type, onClick, ...props }: MyButtonProps) => {
  let extend
  if (icon) {
    extend = !loading && icon
  }

  return (
    <Button
      {...props as any}
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
