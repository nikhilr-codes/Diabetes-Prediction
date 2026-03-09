import styles from "./ResultCard.module.css";

export default function ResultCard({ values, fields, onReset }) {
  return (
    <div className={styles.card}>

      {/* Header */}
      <div className={styles.hero}>
        <div className={styles.emoji}>✅</div>
        <div className={styles.badge}>DATA SUBMITTED</div>
        <p className={styles.summary}>
          All clinical parameters have been recorded successfully.
          Your data has been sent to our medical analysis system.
        </p>
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Summary Table */}
      <div className={styles.sectionLabel}>SUBMITTED VALUES</div>
      <div className={styles.table}>
        {fields.map((f) => (
          <div key={f.key} className={styles.row}>
            <div className={styles.rowLeft}>
              <span className={styles.rowIcon}>{f.icon}</span>
              <span className={styles.rowLabel}>{f.label}</span>
            </div>
            <div className={styles.rowRight}>
              <span className={styles.rowValue}>{values[f.key]}</span>
              <span className={styles.rowUnit}>{f.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Info banner */}
      <div className={styles.infoBanner}>
        <div className={styles.infoIcon}>⏳</div>
        <div>
          <div className={styles.infoTitle}>Awaiting Analysis</div>
          <div className={styles.infoText}>
            Our backend system will process your data and return the risk assessment shortly.
          </div>
        </div>
      </div>

      <p className={styles.disclaimer}>
        ⚠️ This tool is for screening purposes only. Always consult a qualified healthcare professional.
      </p>

      <button className={styles.resetBtn} onClick={onReset}>
        ↺ New Assessment
      </button>
    </div>
  );
}