import { useGetUser } from "@/components/admin/api/usersQuery";
import React, { useState } from "react";
import {
  FacilitiesInfoForm,
  GeneralInfoForm,
  PhotosForm,
  PoliciesInfoForm,
  RoomsInfoForm,
  ServicesInfoForm,
} from "./forms";
import StepFormHeader from "./step_form_header";
import { ADD_PROPERTY_STEPS_HEADER } from "./utils/add_property_form_headers";

interface IRegisterMultiForm {
  currentStep: number;
  onGoBack: () => void;
  onNextStep: () => void;
  goOnStep: (step: number) => void;
}

const mapStepToText = {
  1: "Расскажите нам о названии вашего объекта размещения, его контактных данных и адресе.",
  2: "Расскажите нам о своих номерах. Как только вы заполните данные о своем первом номере, вы сможете добавить информацию об остальных номерах.",
  3: "Расскажите нам об общих данных вашего отеля, таких как предоставляемые услуги, парковка и языки на которых говорит ваш персонал.",
  4: "Расскажите нам о таких деталях, как дополнительные кровати, удобства и особенности в номере.",
  5: "Загружайте фотографии высокого разрешения которые представляют ваш объект размещения. Эти фотографии будут показываться на странице вашего объекта на сайте Panabooking.kz",
  6: "Определите некоторые из основных правил",
};

export interface ISubmitBtnState {
  saveModalOpened: boolean;
  changesMade: boolean;
}

export default function RegisterMultiForm({
  currentStep,
  onGoBack,
  onNextStep,
  goOnStep,
}: IRegisterMultiForm) {
  const { user } = useGetUser();

  const [submitBtnState, setSubmitBtnState] = useState<ISubmitBtnState>({
    saveModalOpened: false,
    changesMade: false,
  });

  return (
    <div>
      <div className="mt-8 ">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
          {currentStep === 1
            ? `Добро пожаловать ${user?.firstname || ""}`
            : ADD_PROPERTY_STEPS_HEADER[
                (currentStep - 1) as keyof typeof ADD_PROPERTY_STEPS_HEADER
              ]}
        </h2>

        <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
          {mapStepToText[currentStep as keyof typeof mapStepToText]}
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-col flex-wrap px-5 py-4">
        {/* STEP TOP BAR */}
        <StepFormHeader
          currentStep={currentStep}
          goOnStep={goOnStep}
          submitBtnState={submitBtnState}
          setSubmitBtnState={setSubmitBtnState}
        />
        {/* FORM BODY */}
        <div>
          {currentStep === 1 && (
            <GeneralInfoForm
              onGoBack={onGoBack}
              onNextStep={onNextStep}
              submitBtnState={submitBtnState}
              setSubmitBtnState={setSubmitBtnState}
            />
          )}
          {currentStep === 2 && (
            <RoomsInfoForm
              onGoBack={onGoBack}
              onNextStep={onNextStep}
              submitBtnState={submitBtnState}
              setSubmitBtnState={setSubmitBtnState}
            />
          )}
          {currentStep === 3 && (
            <ServicesInfoForm
              onGoBack={onGoBack}
              onNextStep={onNextStep}
              submitBtnState={submitBtnState}
              setSubmitBtnState={setSubmitBtnState}
            />
          )}
          {currentStep === 4 && (
            <FacilitiesInfoForm
              onGoBack={onGoBack}
              onNextStep={onNextStep}
              submitBtnState={submitBtnState}
              setSubmitBtnState={setSubmitBtnState}
            />
          )}
          {currentStep === 5 && (
            <PhotosForm
              onGoBack={onGoBack}
              onNextStep={onNextStep}
              submitBtnState={submitBtnState}
              setSubmitBtnState={setSubmitBtnState}
            />
          )}
          {currentStep === 6 && (
            <PoliciesInfoForm onGoBack={onGoBack} onNextStep={onNextStep} />
          )}
        </div>
      </div>
    </div>
  );
}
