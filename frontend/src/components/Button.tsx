import styles from "./Button.module.css";

interface ButtonProps {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className = "", onClick = () => {}, children }) => {
  return (
    <button
      className={`${styles.buttonStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
