import styles from "./ButtonGroup.module.css";
import React from "react";
import Button from "./Button.js";
interface ButtonGroupProps {
  className?: string;
  firstButtonLabel ?: string;
  secondButtonLabel ?: string;
  firstClickEvent?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  secondClickEvent?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  className = "",
  firstButtonLabel="",
  secondButtonLabel="",
  firstClickEvent = () => {},
  secondClickEvent = () => {},
}) => {
  return (
    <div className={`${className} ${styles.buttonGroupContainer}`} >
      <Button onClick={firstClickEvent}>{firstButtonLabel}</Button>
      <Button onClick={secondClickEvent}>{secondButtonLabel}</Button>
    </div>
  );
};

export default ButtonGroup;
