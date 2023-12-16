import React, { useState } from "react";
import { ADD_PROPERTY_STEPS_HEADER } from "./utils/add_property_form_headers";
import { TiTick } from "react-icons/ti";
import { useRegisterPropertyStore } from "../../store/store";
import Modal from "@/shared/UI/Modal/Modal";
import { type ISubmitBtnState } from "./register_multi_form";

interface IStepFormHeader {
  currentStep: number;
  goOnStep: (step: number) => void;
  submitBtnState: ISubmitBtnState;
  setSubmitBtnState: (val: ISubmitBtnState) => void;
}

export default function StepFormHeader({
  currentStep,
  goOnStep,
  submitBtnState,
  setSubmitBtnState,
}: IStepFormHeader) {
  // MULTIFORM STATE
  const formState = useRegisterPropertyStore();

  const [showChangesModal, setShowChangesModal] = useState<{
    show: boolean;
    step: number;
  }>({ show: false, step: -1 });

  const closeModal = () => setShowChangesModal({ show: false, step: -1 });

  const completedSteps = (step: number): boolean => {
    if (step === 0) {
      return formState.generalInfo;
    } else if (step === 1) {
      return formState.roomsInfo;
    } else if (step === 2) {
      return formState.servicesInfo;
    } else if (step === 3) {
      return formState.facilitiesInfo;
    } else if (step === 4) {
      return formState.photosInfo;
    }

    return false;
  };

  const onClickStepHeader = (step: number): boolean => {
    if (step === 0) {
      return true;
    } else if (step === 1) {
      return formState.generalInfo;
    } else if (step === 2) {
      return formState.roomsInfo;
    } else if (step === 3) {
      return formState.servicesInfo;
    } else if (step === 4) {
      return formState.facilitiesInfo;
    } else if (step === 5) {
      return formState.photosInfo;
    }

    return false;
  };

  const onStepClick = (step: number) => {
    if (submitBtnState.changesMade) {
      setShowChangesModal({ show: true, step });
      setSubmitBtnState({ ...submitBtnState, saveModalOpened: true });
    } else {
      goOnStep(step);
    }
  };

  const totalSteps = Object.values(ADD_PROPERTY_STEPS_HEADER).length;

  return (
    <div className="flex">
      {Array.from({ length: totalSteps }).map((_, index) => {
        return (
          <button
            key={"step" + index}
            onClick={() => {
              console.log("index =", index);
              onClickStepHeader(index) && onStepClick(index + 1);
            }}
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
            {completedSteps(index) && (
              <span>
                <TiTick color="green" />
              </span>
            )}
          </button>
        );
      })}

      <Modal
        open={showChangesModal.show}
        onClose={closeModal}
        title={"Вы не сохранили изменения"}
        className="overflow-y-auto"
      >
        <div>
          <p className="text-lg">
            Сохраните изменения прежде чем перейти в другую форму
          </p>
          <div className="mt-4 flex gap-4">
            <button
              className="w-full border text-gray-500 hover:text-gray-700"
              onClick={() => {
                closeModal();
                // SCROLL TO BOTTOM SMOOTHLY
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }}
            >
              Закрыть
            </button>
            <button
              onClick={() => {
                showChangesModal.step > 0 && goOnStep(showChangesModal.step);
                closeModal();
              }}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Перейти без сохранении
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
