import styles from "./Background.module.css";

export default function Background() {
  return (
    <>
      <div className={styles.gradient} />
      <div className={styles.grid} />
    </>
  );
}