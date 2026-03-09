import styles from "./ProgressBar.module.css";

export default function ProgressBar({ step, total, onStepClick }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.meta}>
        <span className={styles.label}>PROGRESS</span>
        <span className={styles.counter}>{step + 1} / {total}</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${((step + 1) / total) * 100}%` }} />
      </div>
      <div className={styles.dots}>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${
              i < step ? styles.dotDone : i === step ? styles.dotActive : styles.dotIdle
            }`}
            onClick={() => onStepClick(i)}
          />
        ))}
      </div>
    </div>
  );
}