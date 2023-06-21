import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { type EditRoom, editRoomSchema } from "./types/editRoomTypes";
import EditRoomNameForm from "./forms/EditRoomNameForm";
import EditRoomInfoForm from "./forms/EditRoomInfoForm";
import EditRoomQuantityForm from "./forms/EditRoomQuantityForm";
import { type PropertyRoom } from "@/server/objects/objects.types";
import { AiFillTags } from "react-icons/ai";
import { useMutateRoom } from "../editDescription/service/useMutateProperty";
import { useNotifications } from "@/shared/UI/AppToaster/AppToaster";
import { FACILITIES_CATEGORIES } from "../registerProperty/components/register_multi_form/utils/const_data";

export default function EditRoomInfoSection({
  initState,
}: {
  initState: PropertyRoom;
}) {
  // FACILITIES
  const [facilities, setFacilities] = useState(initState.facilities);
  // NOTIFICATIONS
  const { notifySuccess, notifyInfo } = useNotifications();
  // UPDATE STATE AFTER EDIT
  const [_, setUpdateUI] = useState(false);
  // API
  const { mutateAsync, isLoading } = useMutateRoom();
  // FORM
  const formMethods = useForm<EditRoom>({
    resolver: yupResolver(editRoomSchema),
    defaultValues: {
      allowedSmoking: initState.allowedSmoking,
      beds: initState.beds,
      maxGuests: initState.maxGuests,
      surfaceArea: initState.surfaceArea,
      name: +initState.roomName,
      type: +initState.roomType,
      maxChildren: initState.maxChildren,
      similarRoomsNumber: initState.similarRoomsNumber,
    },
  });

  const onSubmit = async (data: EditRoom) => {
    if (!isLoading) {
      await mutateAsync({
        id: initState.id,
        allowedSmoking: data.allowedSmoking,
        beds: data.beds,
        maxGuests: data.maxGuests,
        surfaceArea: data.surfaceArea,
        roomName: data.name,
        maxChildren: data.maxChildren,
        roomType: data.type,
        similarRoomsNumber: data.similarRoomsNumber,
        facilities,
      });
      notifySuccess("Номер успешно изменен");
    } else {
      notifyInfo("Подождите, идет загрузка");
    }
  };

  const onChangeFacilities = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFacilities((prev) => [...prev, +value]);
    } else {
      setFacilities((prev) => prev.filter((item) => item !== +value));
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
          {FACILITIES_CATEGORIES.map((category) => {
            return (
              <div key={category.label} className="mt-4 bg-white pb-4 shadow">
                <h3 className="p-4 text-xl font-semibold">{category.label}</h3>
                <div className="flex flex-wrap">
                  {category.value.map((service) => {
                    return (
                      <div className="w-1/2 px-4 py-4" key={service.value}>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            onChange={onChangeFacilities}
                            value={service.value}
                            checked={facilities.includes(service.value)}
                          />
                          <span className="ml-2">{service.label}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {/* DIVIDER */}
          <div className="my-6"></div>

          <button
            className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"
            onClick={formMethods.handleSubmit(onSubmit, (err) => {
              console.log("err =", err);
              setUpdateUI((prev) => !prev);
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
