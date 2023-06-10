import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import RoomsSection from "@/components/rooms/RoomsSection";
import Container from "@/entities/container/container";
import React from "react";

export default function RoomsPage() {
  const { object, isLoading } = useGetUserSelectedObject();

  return (
    <Container authHeader loading={isLoading}>
      {object && <RoomsSection rooms={object.rooms} />}
    </Container>
  );
}
