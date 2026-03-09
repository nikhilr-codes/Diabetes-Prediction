import { useState } from "react";
import "./App.css";

import Background    from "./assets/components/Background";
import Header        from "./assets/components/Header";
import Navbar        from "./assets/components/Navbar";
import FormCard      from "./assets/components/FormCard";
import ResultCard    from "./assets/components/ResultCard";

const fields = [
  { key:"pregnancies",   label:"Pregnancies",                icon:"🤰", min:0, max:20,  step:1,     unit:"times",  desc:"Number of times pregnant" },
  { key:"glucose",       label:"Glucose",                    icon:"🩸", min:0, max:300, step:1,     unit:"mg/dL",  desc:"Plasma glucose concentration" },
  { key:"bloodPressure", label:"Blood Pressure",             icon:"💓", min:0, max:200, step:1,     unit:"mmHg",   desc:"Diastolic blood pressure" },
  { key:"skinThickness", label:"Skin Thickness",             icon:"🔬", min:0, max:100, step:1,     unit:"mm",     desc:"Triceps skin fold thickness" },
  { key:"insulin",       label:"Insulin",                    icon:"💉", min:0, max:900, step:1,     unit:"μU/mL",  desc:"2-Hour serum insulin" },
  { key:"bmi",           label:"BMI",                        icon:"⚖️", min:0, max:70,  step:0.1,   unit:"kg/m²",  desc:"Body mass index" },
  { key:"dpf",           label:"Diabetes Pedigree Function", icon:"🧬", min:0, max:3,   step:0.001, unit:"score",  desc:"Genetic diabetes likelihood" },
  { key:"age",           label:"Age",                        icon:"📅", min:1, max:120, step:1,     unit:"years",  desc:"Age in years" },
];

const initialValues = {
  pregnancies:"", glucose:"", bloodPressure:"", skinThickness:"",
  insulin:"", bmi:"", dpf:"", age:""
};

export default function App() {
  const [values,   setValues]   = useState(initialValues);
  const [step,     setStep]     = useState(0);
  const [touched,  setTouched]  = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key, val) => setValues(p => ({ ...p, [key]: val }));

  const handleNext = () => {
    const key = fields[step].key;
    setTouched(t => ({ ...t, [key]: true }));
    if (values[key] === "") return;               // block if empty
    if (step < fields.length - 1) {
      setStep(s => s + 1);
    } else {
      setSubmitted(true);                          // all fields filled → show summary
    }
  };

  const reset = () => {
    setValues(initialValues);
    setStep(0);
    setTouched({});
    setSubmitted(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "24px", paddingTop: "80px"
    }}>
      <Background />
      <Navbar />

      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:"560px" }}>
        <Header />

        {submitted
          ? <ResultCard values={values} fields={fields} onReset={reset} />
          : <FormCard
              fields={fields}
              values={values}
              step={step}
              touched={touched}
              onNext={handleNext}
              onBack={() => setStep(s => s - 1)}
              onStepClick={setStep}
              onChange={handleChange}
            />
        }

        <p style={{ textAlign:"center", marginTop:"24px", color:"#1f4038", fontSize:"11px", letterSpacing:"1px" }}>
          DIABETES RISK ASSESSMENT v1.0 • CLINICAL AI
        </p>
      </div>
    </div>
  );
}