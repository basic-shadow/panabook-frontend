import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import RoomPhotosTable from "@/components/roomPhotos/RoomPhotosTable";
import Container from "@/entities/container/container";
import React from "react";

export default function RoomPhotosPage() {
  const { object, isLoading } = useGetUserSelectedObject();
  return (
    <Container authHeader loading={isLoading}>
      {object && <RoomPhotosTable rooms={object.rooms} />}
    </Container>
  );
}
