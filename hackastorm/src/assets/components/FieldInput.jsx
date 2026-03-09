import { useEffect, useRef } from "react";
import styles from "./FieldInput.module.css";

export default function FieldInput({ field, value, onChange, error }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [field.key]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.fieldHeader}>
        <div className={styles.iconBox}>{field.icon}</div>
        <div>
          <div className={styles.fieldLabel}>{field.label}</div>
          <div className={styles.fieldDesc}>{field.desc}</div>
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="number"
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter value (${field.min}–${field.max})`}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
        />
        <span className={styles.unit}>{field.unit}</span>
      </div>
      {error && <p className={styles.errorMsg}>⚠ This field is required</p>}
    </div>
  );
}