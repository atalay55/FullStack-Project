import { useState } from "react";
import styles from "./TextInput.module.css";
import { useTheme } from "../context/ThemeContext";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onlyLetters?: boolean;
  placeholder?: string;
  onErrorChange?: (hasError: boolean) => void; // Yeni
}

export default function TextInput({
  label,
  value,
  onChange,
  onlyLetters,
  placeholder,
  onErrorChange,
}: TextInputProps) {
  const [error, setError] = useState("");
  const { darkMode } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);

    if (onlyLetters) {
      if (!val) {
        setError(`${label} boş olamaz`);
        onErrorChange && onErrorChange(true);
      } else if (/^[a-zA-Z ]+$/.test(val)) {
        setError("");
        onErrorChange && onErrorChange(false);
      } else {
        setError(`${label} sadece harf girilebilir`);
        onErrorChange && onErrorChange(true);
      }
    } else {
      setError("");
      onErrorChange && onErrorChange(false);
    }
  };

  return (
    <div className={`${styles.formGroup}  ${darkMode ? styles.darkCard : ""}`}>
      <label>{label}</label>
      <input value={value} onChange={handleChange} placeholder={placeholder} />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
