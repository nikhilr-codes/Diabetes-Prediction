import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>🩺 DiabetesAI</div>
      <div className={styles.links}>
        <span className={styles.link}>Assessment</span>
        <span className={styles.link}>About</span>
      </div>
    </nav>
  );
}