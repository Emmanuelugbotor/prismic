import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ReactElement, forwardRef, HTMLAttributes } from "react";

interface CustomCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement;
  label: string;
}

const CustomCard = forwardRef<HTMLDivElement, CustomCardProps>(
  ({ children, label, ...rest }, ref) => (
    <Tooltip {...rest} ref={ref} title={label} arrow placement="left">
      {children}
    </Tooltip>
  )
);

export default CustomCard;
