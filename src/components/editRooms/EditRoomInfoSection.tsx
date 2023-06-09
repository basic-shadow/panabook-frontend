import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { type EditRoom, editRoomSchema } from "./types/editRoomTypes";
import EditRoomNameForm from "./forms/EditRoomNameForm";
import EditRoomInfoForm from "./forms/EditRoomInfoForm";
import EditRoomQuantityForm from "./forms/EditRoomQuantityForm";

export default function EditRoomInfoSection({
  id,
  initState,
}: {
  id: string;
  initState: any;
}) {
  const router = useRouter();
  // FORM
  const formMethods = useForm<EditRoom>({
    resolver: yupResolver(editRoomSchema),
    defaultValues: initState,
  });

  useEffect(() => {
    if (!id) {
      router.push("/rooms");
    }
  }, [id]);

  return (
    <MainDashboard>
      <div className="px-4 py-6">
        <h2 className="border-b px-4 py-4 text-xl font-semibold">
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
        </FormProvider>
      </div>
    </MainDashboard>
  );
}
