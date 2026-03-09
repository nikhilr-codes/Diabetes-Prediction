import styles from "./Navbar.module.css";

export default function Navbar({ page, onNavigate }) {
  return (
    <nav className={styles.nav}>
      <button
        className={styles.logo}
        onClick={() => onNavigate("home")}
      >
        🩺 SugarSense
      </button>
      <div className={styles.links}>
        <button
          className={`${styles.link} ${page === "home" ? styles.active : ""}`}
          onClick={() => onNavigate("home")}
        >
          Assessment
        </button>
        <button
          className={`${styles.link} ${page === "about" ? styles.active : ""}`}
          onClick={() => onNavigate("about")}
        >
          About
        </button>
      </div>
    </nav>
  );
}