import EditRoomInfoSection from "@/components/editRooms/EditRoomInfoSection";
import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import Container from "@/entities/container/container";
import React from "react";

export default function CreateRoomsPage() {
  const { object, isLoading } = useGetUserSelectedObject();

  return (
    <Container authHeader loading={isLoading}>
      {object && <EditRoomInfoSection object={object} />}
    </Container>
  );
}
