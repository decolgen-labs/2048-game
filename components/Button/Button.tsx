import { forwardRef, PropsWithChildren } from "react";
import StyledButton, { StyledButtonProps } from "./StyledButton";

export interface ButtonProps extends StyledButtonProps {
  onClick: () => void;
}

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  ({ onClick, disable = false, ...rest }, ref) => (
    <StyledButton
      ref={ref}
      disable={disable}
      onClick={disable ? undefined : onClick}
      {...rest}
    />
  ),
);

export default Button;
