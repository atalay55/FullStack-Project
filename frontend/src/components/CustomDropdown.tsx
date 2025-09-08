import { useState, useRef, useEffect } from "react";
import styles from "./customDropdown.module.css";
import { useTheme } from "../context/ThemeContext";
import { FaArrowUp, FaArrowDown, } from "react-icons/fa";
interface Option {
  value: number | string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: number | string;
  onChange: (val: number | string) => void;
  placeholder?: string;
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useTheme();


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className={`${styles.dropdown} ${darkMode ? styles.darkCard : ""}`} ref={dropdownRef}>
      <div
        className={`${styles.dropdownHeader} ${open ? styles.open : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span className={styles.icon}>{open ? <FaArrowUp/> : <FaArrowDown/>}</span>
      </div>

      {open && (
        <ul className={styles.dropdownList}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`${styles.dropdownItem} ${
                opt.value === value ? styles.active : ""
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
