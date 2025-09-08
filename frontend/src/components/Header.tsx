import React from "react";
import styles from "./Header.module.css";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Fullstack Project" }: HeaderProps) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={styles.titleContainer}>
      <h1>{title}</h1>
      <div className={styles.themeToggleWrapper}>
        <ThemeToggle darkMode={darkMode} setDarkMode={toggleDarkMode} />
      </div>
    </div>
  );
}
