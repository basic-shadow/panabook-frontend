import EditPropertyDescriptionSection from "@/components/editDescription/EditPropertyDescriptionSection";
import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import Container from "@/entities/container/container";
import React from "react";

export default function EditPropertyDescriptionPage() {
  const { object, isLoading } = useGetUserSelectedObject();

  return (
    <Container authHeader loading={isLoading}>
      {object && <EditPropertyDescriptionSection initState={object} />}
    </Container>
  );
}
