import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.badge}>
        <span className={styles.dot} />
        <span className={styles.badgeText}>Health Analytics</span>
      </div>
      <h1 className={styles.title}>
        Diabetes Risk
        <br />
        <span className={styles.accent}>Assessment</span>
      </h1>
      <p className={styles.subtitle}>Powered by clinical ML analysis</p>
    </header>
  );
}