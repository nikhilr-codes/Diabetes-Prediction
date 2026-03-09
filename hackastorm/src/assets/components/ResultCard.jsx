import styles from "./ResultCard.module.css";

export default function ResultCard({ values, fields, onReset, result, loading, error }) {
  return (
    <div className={styles.card}>

      {/* Header */}
      <div className={styles.hero}>
        <div className={styles.emoji}>{error ? "❌" : result ? (result.prediction === 1 ? "⚠️" : "✅") : "⏳"}</div>
        <div className={styles.badge}>{error ? "ERROR" : result ? "ASSESSMENT READY" : "PROCESSING"}</div>
        <p className={styles.summary}>
          {error
            ? `Connection to medical system failed: ${error}`
            : result
                ? `Based on the analysis, there is a ${result.confidence} chance that you are ${result.label.toLowerCase()}.`
                : "All clinical parameters recorded. Awaiting backend analysis..."
          }
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

      {/* Info banner / Results */}
      {result && !error && (
        <div className={result.prediction === 1 ? styles.warningBanner : styles.infoBanner}>
          <div className={styles.infoIcon}>{result.prediction === 1 ? "🩺" : "✨"}</div>
          <div>
            <div className={styles.infoTitle}>
              {result.prediction === 1 ? "Attention Required" : "Positive Outcome"}
            </div>
            <div className={styles.infoText}>
              {result.prediction === 1
                ? `High risk detected (${result.probability.diabetic}%). Please schedule a clinical consultation.`
                : `Low risk detected (${result.probability.healthy}%). Maintain your current healthy lifestyle!`
              }
              {result.is_simulated && <span style={{ display: 'block', fontSize: '10px', marginTop: '4px', opacity: 0.7 }}>* Results produced by simulation engine due to model maintenance.</span>}
            </div>
          </div>
        </div>
      )}

      {loading && !result && !error && (
        <div className={styles.infoBanner}>
          <div className={styles.spinIcon}>🔄</div>
          <div>
            <div className={styles.infoTitle}>Analyzing Data</div>
            <div className={styles.infoText}>Consulting the predictive model...</div>
          </div>
        </div>
      )}

      <p className={styles.disclaimer}>
        ⚠️ This tool is for screening purposes only. Always consult a qualified healthcare professional.
      </p>

      <button className={styles.resetBtn} onClick={onReset}>
        ↺ New Assessment
      </button>
    </div>
  );
}