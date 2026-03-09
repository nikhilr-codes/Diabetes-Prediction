import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
  return (
    <div className={styles.card}>
      <div className={styles.spinner}>⚙️</div>
      <div className={styles.primary}>ANALYZING...</div>
      <div className={styles.secondary}>Processing clinical parameters</div>
    </div>
  );
}