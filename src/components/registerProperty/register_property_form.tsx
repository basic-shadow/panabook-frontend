// import useUrlParams from "@/shared/hooks/useUrlParams";
import React, { useCallback, useState } from "react";
import RegisterMultiForm from "./components/register_multi_form/register_multi_form";
import PropertyCategoryForm from "./components/property_category_form/property_category_form";

// const mapStepToUrlLocation = {
//   0: "?",
//   1: "?general-info",
//   2: "?location",
// };

export default function RegisterPropertyForm() {
  // const { onChangeSearchParams } = useUrlParams();
  const [step, setStep] = useState(0);

  const onNextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const onBackStep = useCallback(() => setStep((prev) => prev - 1), []);

  const goOnStep = useCallback((stepNum: number) => setStep(stepNum), []);

  if (step === 0)
    return (
      <PropertyCategoryForm
        nextStep={() => {
          onNextStep();
          // onChangeSearchParams(mapStepToUrlLocation[1]);
        }}
      />
    );

  return (
    <RegisterMultiForm
      currentStep={step}
      onGoBack={onBackStep}
      onNextStep={onNextStep}
      goOnStep={goOnStep}
    />
  );
}
