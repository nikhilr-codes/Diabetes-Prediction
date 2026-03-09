import styles from "./MiniSummary.module.css";

export default function MiniSummary({ fields, values, currentStep, onJump }) {
  const entered = fields.slice(0, currentStep).filter(f => values[f.key] !== "");
  if (entered.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>ENTERED SO FAR</div>
      <div className={styles.chips}>
        {entered.map((f) => (
          <button key={f.key} className={styles.chip} onClick={() => onJump(fields.indexOf(f))}>
            {f.icon} <span className={styles.chipKey}>{f.label.split(" ")[0]}:</span> {values[f.key]}
          </button>
        ))}
      </div>
    </div>
  );
}