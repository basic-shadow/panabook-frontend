import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import EditRateSection from "@/components/rates/EditRateSection";
import Container from "@/entities/container/container";
import React from "react";

export default function CreateRatePage() {
  const { object, isLoading } = useGetUserSelectedObject();

  return (
    <Container authHeader loading={isLoading}>
      {object && (
        <EditRateSection
          objectId={object.id}
          roomPlans={object.rooms.map((room) => ({
            id: room.id,
            name: +room.roomName,
          }))}
        />
      )}
    </Container>
  );
}
