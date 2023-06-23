import React from "react";
import { ADD_PROPERTY_STEPS_HEADER } from "./utils/add_property_form_headers";
import { TiTick } from "react-icons/ti";
import { useRegisterPropertyStore } from "../../store/store";

interface IStepFormHeader {
  currentStep: number;
  goOnStep: (step: number) => void;
}

export default function StepFormHeader({
  currentStep,
  goOnStep,
}: IStepFormHeader) {
  // MULTIFORM STATE
  const formState = useRegisterPropertyStore();

  const onClickStepHeader = (step: number): boolean => {
    // return true;
    if (step === 1) {
      return true;
    } else if (step === 2) {
      return (
        formState.propertyCity !== -1 &&
        formState.propertyAddress !== "" &&
        formState.propertyPostCode !== "" &&
        formState.contactPhone1 !== "" &&
        formState.propertyName !== "" &&
        formState.contactName !== "" &&
        formState.starsRating !== 0
      );
    } else if (step === 3) {
      return formState.propertyRooms.length > 0;
    } else if (step === 4) {
      return formState.propertyLanguages.length > 0;
    } else if (step === 5) {
      return formState.propertyRooms.length > 0;
    } else if (step === 6) {
      return formState.propertyPhotos.length > 0;
    }
    return false;
  };

  const totalSteps = Object.values(ADD_PROPERTY_STEPS_HEADER).length;

  return (
    <div className="flex">
      {Array.from({ length: totalSteps }).map((_, index) => {
        return (
          <button
            key={"step" + index}
            onClick={() => onClickStepHeader(index + 1) && goOnStep(index + 1)}
            className={
              "title-font flex flex-grow gap-1 rounded-t px-4 py-4 text-center font-medium leading-none tracking-wider hover:cursor-pointer hover:text-gray-900 sm:w-auto sm:justify-start sm:px-6" +
              (currentStep - 1 === index
                ? "border-b-2 border-indigo-500 bg-gray-100 text-indigo-500"
                : "")
            }
          >
            {
              ADD_PROPERTY_STEPS_HEADER[
                index as keyof typeof ADD_PROPERTY_STEPS_HEADER
              ]
            }
            {currentStep - 1 > index && (
              <span>
                <TiTick color="green" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
