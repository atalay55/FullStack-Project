import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import Button from "./components/Button";
import Header from "./components/Header";
import { useTheme } from "./context/ThemeContext";
import { CONSTANT } from "./constants/Constant";

export default function HomePage() {
  const { darkMode } = useTheme();
  return (
    <div className={`${styles.appContainer} ${darkMode ? styles.dark : ""}`}>
      <Header title={CONSTANT.constText.title} />

      <div className={styles.homeLinks}>
        {[
          { path: "/users", label: CONSTANT.constText.gotoUser },
          { path: "/posts", label: CONSTANT.constText.gotoPost },
        ].map((link) => (
          <Link key={link.path} to={link.path}>
            <Button className={styles.homeButton}>{link.label}</Button>
          </Link>
        ))}
      </div>

      <p className={styles.homeDescription}>
       {CONSTANT.constText.description}
      </p>
    </div>
  );
}
