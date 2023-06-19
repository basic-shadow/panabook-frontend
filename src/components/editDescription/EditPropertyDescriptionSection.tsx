import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  descriptionSchema,
  type PropertyDescription,
} from "./types/descriptionTypes";
import GeneralDescriptionForm from "./forms/GeneralDescriptionForm";
import AddressForm from "./forms/AddressForm";
import { LANGUAGES } from "../registerProperty/components/register_multi_form/utils/const_data";
import { type ObjectsInfo } from "@/server/objects/objects.types";
import { normalizeStringToArrayNumber } from "@/shared/utils/normalizePropertyValues";
import { useMutateProperty } from "./service/useMutateProperty";
import { useNotifications } from "@/shared/UI/AppToaster/AppToaster";

export default function EditPropertyDescriptionSection({
  initState,
}: {
  initState: ObjectsInfo;
}) {
  const { notifySuccess } = useNotifications();
  // MUTATION
  const { mutateAsync, isLoading } = useMutateProperty();

  const formMethods = useForm<PropertyDescription>({
    resolver: yupResolver(descriptionSchema),
    defaultValues: {
      type: +initState.category,
      city: +initState.city,
      address: initState.address,
      name: initState.name,
      stars: initState.stars,
      priceForNonResidents: initState.minimumNonResidentPrice,
      priceForResidents: initState.minimumResidentPrice,
      totalRooms: initState.totalRoomsNumber,
      language: normalizeStringToArrayNumber(initState.languageSpoken),
      contactName: initState.contactName,
      contactPhone: initState.contactPhone1,
    },
  });

  async function onSubmit(data: PropertyDescription) {
    if (formMethods.formState.isValid && !isLoading) {
      const contactPhone2 = formMethods.getValues().contactPhone2;
      await mutateAsync({
        ...initState,
        address: data.address,
        category: data.type.toString(),
        city: data.city,
        contactName: data.contactName,
        contactPhone1: data.contactPhone,
        contactPhone2: contactPhone2 ? contactPhone2 : "",
        languageSpoken: data.language.join(","),
        minimumNonResidentPrice: data.priceForNonResidents,
        minimumResidentPrice: data.priceForResidents,
        name: data.name,
        stars: data.stars,
        totalRoomsNumber: data.totalRooms,
      });

      notifySuccess("Изменения сохранены");
    }
  }
  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <FormProvider {...formMethods}>
          <div className="bg-white shadow">
            <h3 className="border-b px-4 py-4 text-xl font-semibold">
              Общая информация
            </h3>
            <GeneralDescriptionForm
              value={formMethods.watch()}
              setValue={formMethods.setValue}
            />
          </div>
          <div className="mt-8 bg-white shadow">
            <h3 className="border-b px-4 py-4 text-xl font-semibold">
              Адрес объекта размещения
            </h3>
            <AddressForm
              value={formMethods.watch()}
              setValue={formMethods.setValue}
            />
          </div>
          <div className="mt-8 bg-white shadow">
            <h3 className="border-b px-4 py-4 text-xl font-semibold">
              Языки, на которых говорит ваш персонал
            </h3>
            {LANGUAGES.map((lang) => {
              /* CHECKBOXES */
              return (
                <div className="px-4 py-4" key={lang.value}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="languages"
                      value={lang.value}
                      checked={formMethods
                        .watch()
                        .language?.includes(lang.value)}
                      onChange={(e) => {
                        formMethods.setValue(
                          "language",
                          e.target.checked
                            ? [...formMethods.watch().language, lang.value]
                            : formMethods
                                .watch()
                                .language.filter((l) => l !== lang.value)
                        );
                      }}
                    />
                    <span className="ml-2">{lang.label}</span>
                  </label>
                </div>
              );
            })}
          </div>
          {/* SUBMIT */}
          <div className="my-8">
            {/* SAVE BUTTON */}
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              type="submit"
              onClick={formMethods.handleSubmit(onSubmit, (err) => {
                console.log(err);
              })}
            >
              Сохранить
            </button>
          </div>
        </FormProvider>
      </div>
    </MainDashboard>
  );
}
