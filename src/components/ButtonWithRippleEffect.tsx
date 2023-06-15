import React from "react";
import Button from "@mui/material/Button";
interface Props {
  label: string;
  handleAction?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}
const ButtonWithRippleEffect: React.FC<Props> = ({
  label,
  handleAction,
  type,
}) => {
  return (
    <Button
      type={type}
      variant="contained"
      color="primary"
      onClick={handleAction}
    >
      {label}
    </Button>
  );
};
export default ButtonWithRippleEffect;
