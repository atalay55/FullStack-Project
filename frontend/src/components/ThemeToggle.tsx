import { useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import styles from "./themeToggle.module.css";

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`${styles.themeToggle} ${darkMode ? styles.darkMode : ""}`}
      >
        {darkMode ? <BsSun /> : <BsMoon />}
        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
      </button>
    </div>
  );
}
