import ProgressBar  from "./ProgressBar";
import FieldInput   from "./FieldInput";
import NavButtons   from "./NavButtons";
import MiniSummary  from "./MiniSummary";
import styles       from "./FormCard.module.css";

export default function FormCard({ fields, values, step, touched, onNext, onBack, onStepClick, onChange }) {
  const currentField = fields[step];
  const hasError = touched[currentField.key] && values[currentField.key] === "";

  return (
    <div className={styles.card}>
      <ProgressBar step={step} total={fields.length} onStepClick={onStepClick} />
      <FieldInput
        field={currentField}
        value={values[currentField.key]}
        onChange={(val) => onChange(currentField.key, val)}
        error={hasError}
      />
      <NavButtons step={step} onBack={onBack} onNext={onNext} isLast={step === fields.length - 1} />
      <MiniSummary fields={fields} values={values} currentStep={step} onJump={onStepClick} />
    </div>
  );
}