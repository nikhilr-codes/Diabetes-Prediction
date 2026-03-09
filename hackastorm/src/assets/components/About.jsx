import styles from "./About.module.css";

const STATS = [
  { value: "768",    label: "Patient Records",     icon: "🗂️" },
  { value: "8",      label: "Clinical Parameters", icon: "🔬" },
  { value: "ML",     label: "Powered Model",       icon: "🤖" },
  { value: "Binary", label: "Outcome Prediction",  icon: "🎯" },
];

const FIELDS = [
  { icon: "🤰", name: "Pregnancies",                range: "0 – 20",  desc: "Number of times the patient has been pregnant" },
  { icon: "🩸", name: "Glucose",                    range: "0 – 300 mg/dL", desc: "Plasma glucose concentration over 2 hours" },
  { icon: "💓", name: "Blood Pressure",             range: "0 – 200 mmHg",  desc: "Diastolic blood pressure measurement" },
  { icon: "🔬", name: "Skin Thickness",             range: "0 – 100 mm",    desc: "Triceps skin fold thickness" },
  { icon: "💉", name: "Insulin",                    range: "0 – 900 μU/mL", desc: "2-Hour serum insulin level" },
  { icon: "⚖️", name: "BMI",                        range: "0 – 70 kg/m²",  desc: "Body mass index (weight/height²)" },
  { icon: "🧬", name: "Diabetes Pedigree Function", range: "0 – 3",         desc: "Genetic likelihood score based on family history" },
  { icon: "📅", name: "Age",                        range: "1 – 120 years", desc: "Age of the patient in years" },
];

const STEPS = [
  { step: "01", title: "Enter Parameters",  desc: "Fill in all 8 clinical fields step by step",        icon: "📝" },
  { step: "02", title: "Data Validation",   desc: "Values are checked against clinical safe ranges",    icon: "✅" },
  { step: "03", title: "ML Analysis",       desc: "Backend model processes your data instantly",        icon: "⚙️" },
  { step: "04", title: "View Result",       desc: "Receive a 0 or 1 outcome with clear interpretation", icon: "📊" },
];

export default function About() {
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroBadge}>
          <span className={styles.heroDot} />
          ABOUT THIS TOOL
        </div>
        <h1 className={styles.heroTitle}>
          What is <span className={styles.accent}>SugarSense</span>?
        </h1>
        <p className={styles.heroText}>
          DiabetesAI is a clinical screening tool built on the Pima Indians
          Diabetes Dataset. It collects 8 key health parameters and passes them
          to a machine learning model that predicts whether a patient is likely
          to have diabetes — returning a simple <strong style={{ color:"#00ff87" }}>0 (No)</strong> or{" "}
          <strong style={{ color:"#ff4d6d" }}>1 (Yes)</strong> outcome.
        </p>
      </div>

      {/* ── Stats row ── */}
      <div className={styles.statsGrid}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statIcon}>{s.icon}</div>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Dataset section ── */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>📂 DATASET</div>
        <h2 className={styles.sectionTitle}>Pima Indians Diabetes Dataset</h2>
        <p className={styles.sectionText}>
          Originally from the National Institute of Diabetes and Digestive and
          Kidney Diseases, this dataset contains medical records of female
          patients of Pima Indian heritage, aged 21 and above. It is one of the
          most widely used datasets for binary classification in medical ML.
        </p>

        <div className={styles.outcomeBadges}>
          <div className={styles.outcomeBadge} style={{ borderColor:"rgba(0,255,135,0.3)", background:"rgba(0,255,135,0.06)" }}>
            <span style={{ fontSize:22 }}>✅</span>
            <div>
              <div style={{ color:"#00ff87", fontWeight:700, fontSize:15 }}>Outcome 0</div>
              <div style={{ color:"#4d7c6f", fontSize:12, marginTop:2 }}>No diabetes detected</div>
            </div>
          </div>
          <div className={styles.outcomeBadge} style={{ borderColor:"rgba(255,77,109,0.3)", background:"rgba(255,77,109,0.06)" }}>
            <span style={{ fontSize:22 }}>⚠️</span>
            <div>
              <div style={{ color:"#ff4d6d", fontWeight:700, fontSize:15 }}>Outcome 1</div>
              <div style={{ color:"#4d7c6f", fontSize:12, marginTop:2 }}>Diabetes detected</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Parameters section ── */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>🔬 INPUT PARAMETERS</div>
        <h2 className={styles.sectionTitle}>8 Clinical Fields</h2>
        <div className={styles.fieldsGrid}>
          {FIELDS.map((f) => (
            <div key={f.name} className={styles.fieldCard}>
              <div className={styles.fieldTop}>
                <span className={styles.fieldIcon}>{f.icon}</span>
                <span className={styles.fieldRange}>{f.range}</span>
              </div>
              <div className={styles.fieldName}>{f.name}</div>
              <div className={styles.fieldDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ── */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>⚙️ HOW IT WORKS</div>
        <h2 className={styles.sectionTitle}>4 Simple Steps</h2>
        <div className={styles.stepsGrid}>
          {STEPS.map((s, i) => (
            <div key={s.step} className={styles.stepCard}>
              {i < STEPS.length - 1 && <div className={styles.stepConnector} />}
              <div className={styles.stepNumber}>{s.step}</div>
              <div className={styles.stepIcon}>{s.icon}</div>
              <div className={styles.stepTitle}>{s.title}</div>
              <div className={styles.stepDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div className={styles.disclaimer}>
        <span style={{ fontSize:18 }}>⚠️</span>
        <p>
          This tool is for <strong>screening purposes only</strong> and does not
          constitute medical advice. Always consult a qualified healthcare
          professional for diagnosis and treatment decisions.
        </p>
      </div>

    </div>
  );
}