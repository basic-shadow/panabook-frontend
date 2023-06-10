import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { type EditRoom, editRoomSchema } from "./types/editRoomTypes";
import EditRoomNameForm from "./forms/EditRoomNameForm";
import EditRoomInfoForm from "./forms/EditRoomInfoForm";
import EditRoomQuantityForm from "./forms/EditRoomQuantityForm";
import { type PropertyRoom } from "@/server/objects/objects.types";
import { normalizeStringToArrayNumber } from "@/shared/utils/normalizePropertyValues";
import { AiFillTags } from "react-icons/ai";

export default function EditRoomInfoSection({
  initState,
}: {
  initState: PropertyRoom;
}) {
  // FORM
  const formMethods = useForm<EditRoom>({
    resolver: yupResolver(editRoomSchema),
    defaultValues: {
      allowedSmoking: initState.allowedSmoking,
      beds: initState.beds,
      facilities: normalizeStringToArrayNumber(initState.facility),
      maxGuests: initState.maxGuests,
      surfaceArea: initState.surfaceArea,
      name: +initState.roomName,
      type: +initState.roomType,
      maxChildren: 0,
    },
  });

  const onSubmit = (data: EditRoom) => {
    if (formMethods.formState.isValid) {
      console.log(data);
    }
  };

  return (
    <MainDashboard>
      <div className="px-4 py-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <AiFillTags />
          Изменить номер
        </h2>
        <FormProvider {...formMethods}>
          <EditRoomNameForm
            value={formMethods.watch()}
            setValue={formMethods.setValue}
          />
          <EditRoomInfoForm
            value={formMethods.watch()}
            setValue={formMethods.setValue}
          />
          <EditRoomQuantityForm
            value={formMethods.watch()}
            setValue={formMethods.setValue}
          />
          {/* DIVIDER */}
          <div className="my-6"></div>

          <button
            className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"
            onClick={formMethods.handleSubmit(onSubmit, (err) => {
              console.log(err);
            })}
          >
            Сохранить изменения
          </button>
          {/* SPACER */}
          <div className="my-16"></div>
        </FormProvider>
      </div>
    </MainDashboard>
  );
}
