import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditRoomInfoSection({
  id,
  initState,
}: {
  id: string;
  initState: any;
}) {
  const router = useRouter();
  // FORM
  const formMethods = useForm<PropertyDescription>({
    resolver: yupResolver(descriptionSchema),
    defaultValues: initState,
  });

  useEffect(() => {
    if (!id) {
      router.push("/rooms");
    }
  }, [id]);

  return (
    <MainDashboard>
      <div className="px-4 py-6">EditRoomInfoSection {id}</div>
    </MainDashboard>
  );
}
