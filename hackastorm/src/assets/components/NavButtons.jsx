import styles from "./NavButton.module.css";

export default function NavButtons({ step, onBack, onNext, isLast }) {
  return (
    <div className={styles.row}>
      {step > 0 && (
        <button className={styles.backBtn} onClick={onBack}>← Back</button>
      )}
      <button className={styles.nextBtn} onClick={onNext}>
        {isLast ? "⚡ Analyze Risk" : "Continue →"}
      </button>
    </div>
  );
}