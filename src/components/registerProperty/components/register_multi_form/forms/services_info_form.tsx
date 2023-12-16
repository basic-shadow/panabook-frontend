import { useRegisterPropertyStore } from "@/components/registerProperty/store/store";
import AppDropdown from "@/shared/UI/AppDropdown/AppDropdown";
import Checkbox from "@/shared/UI/Checkbox/Checkbox";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import RegisterPropertyButtons from "../buttons_box";
import { LANGUAGES, PROPERTY_SERVICES } from "../utils/const_data";
import { type ISubmitBtnState } from "../register_multi_form";

export default function ServicesInfoForm({
  onGoBack,
  onNextStep,
  submitBtnState,
  setSubmitBtnState,
}: {
  onGoBack: () => void;
  onNextStep: () => void;
  submitBtnState: ISubmitBtnState;
  setSubmitBtnState: (val: ISubmitBtnState) => void;
}) {
  // MULTIFORM STATE
  const { propertyLanguages, propertyServices } = useRegisterPropertyStore();
  const setValidFormPage = useRegisterPropertyStore(
    (state) => state.setValidFormPage
  );

  const [selectedLangs, setSelectedLangs] =
    useState<number[]>(propertyLanguages);
  const [services, setServices] = useState<number[]>(propertyServices);

  const onAddNewLang = () => {
    // FIND NEW LANG ID FROM LANGUAGES WHICH DOES NOT EXIST IN SELECTED LANGS
    const newLang = LANGUAGES.find(
      (lang) => !selectedLangs.includes(lang.value)
    );
    if (newLang) setSelectedLangs((prev) => [...prev, newLang.value]);
  };

  const onDeleteLang = useCallback((value: number) => {
    setSelectedLangs((prev) => prev.filter((val) => val !== value));
  }, []);

  const langList = useMemo(() => {
    return LANGUAGES.map((lang) => ({
      label: lang.label,
      value: lang.value,
      disabled: !!selectedLangs.find((langs) => langs === lang.value),
    }));
  }, [selectedLangs]);

  function onSubmit(e: any) {
    e.preventDefault();
    if (selectedLangs.length > 0 && services.length > 0) {
      useRegisterPropertyStore.setState({
        propertyLanguages: selectedLangs,
        propertyServices: services,
      });
    }
  }

  const changesMade =
    selectedLangs.length !== propertyLanguages.length ||
    services.length !== propertyServices.length;

  useEffect(() => {
    setSubmitBtnState({ changesMade, saveModalOpened: false });

    return () =>
      setSubmitBtnState({ changesMade: false, saveModalOpened: false });
  }, [selectedLangs, propertyLanguages, propertyServices, services]);

  const onNextPage = (e: any) => {
    setValidFormPage("servicesInfo", true);
    if (!submitBtnState.changesMade && !submitBtnState.saveModalOpened) {
      onNextStep();
    } else if (submitBtnState.changesMade && submitBtnState.saveModalOpened) {
      onSubmit(e);
    } else {
      onSubmit(e);
      onNextStep();
    }
  };

  return (
    <form>
      {/* FIRST FORM BOX */}
      <div className="bg-white py-4 sm:py-6 lg:py-8">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <label
            htmlFor="name"
            className="inline-flex text-lg font-semibold text-gray-800"
          >
            Языки
          </label>
          <p className="-mx-8 mb-6 mt-4 bg-blue-100 px-8 py-4 text-sm text-gray-600">
            Гости больше всего обращают внимание на эти услуги, когда ищут
            место, чтобы остановиться.
          </p>
          <div className="flex flex-col gap-6">
            {/* ROOM BEDS INPUT */}
            {selectedLangs.map((lang, i) => (
              <div className="flex items-center gap-4" key={"lang" + i}>
                <AppDropdown
                  name="languages"
                  selectedValue={{
                    label: LANGUAGES[lang - 1]!.label,
                    value: lang,
                  }}
                  options={langList}
                  onSelect={(val) => {
                    setSelectedLangs((prev) => {
                      const newLangs = [...prev];
                      newLangs[i] = val as number;
                      return newLangs;
                    });
                  }}
                />
                {selectedLangs.length > 1 && (
                  <AiOutlineMinusCircle
                    onClick={() => onDeleteLang(lang)}
                    size={24}
                    className="cursor-pointer text-indigo-500"
                  />
                )}
              </div>
            ))}

            {/* ADD NEW ROOM BED */}
            {selectedLangs.length !== LANGUAGES.length && (
              <div
                className="mb-4 flex w-fit cursor-pointer items-center gap-2 rounded-md border border-indigo-500 px-2 py-2 text-indigo-500"
                onClick={onAddNewLang}
              >
                <IoAddCircleOutline size={24} />
                Добавить еще язык
              </div>
            )}
          </div>
        </div>
      </div>
      {/* SECOND FORM BOX */}
      <div className="mt-4 bg-white py-4 sm:py-6 lg:py-8">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <label
            htmlFor="name"
            className="inline-flex text-lg font-semibold text-gray-800"
          >
            Популярные у гостей услуги
          </label>
          <p className="-mx-8 mb-6 mt-4 bg-blue-100 px-8 py-4 text-sm text-gray-600">
            Гости больше всего обращают внимание на эти услуги, когда ищут
            место, чтобы остановиться.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {/* FACILITIES INPUT */}
            {PROPERTY_SERVICES.map((service, i) => (
              <Checkbox
                id={i}
                key={service.label}
                text={service.label}
                onChange={(e) => {
                  if (e.target.checked) {
                    setServices((prev) => [...prev, service.value]);
                  } else {
                    setServices((prev) =>
                      prev.filter((val) => val !== service.value)
                    );
                  }
                }}
                checked={services.includes(service.value)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <RegisterPropertyButtons
        onGoBack={onGoBack}
        submitText={
          submitBtnState.changesMade && submitBtnState.saveModalOpened
            ? "Сохранить"
            : "Продолжить"
        }
        onNextStep={onNextPage}
      />
    </form>
  );
}
