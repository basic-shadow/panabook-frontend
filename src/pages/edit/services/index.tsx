import EditPropertyServicesSection from "@/components/editServices/EditPropertyServicesSection";
import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import Container from "@/entities/container/container";
import React from "react";

export default function EditPropertyServicesPage() {
  const { object, isLoading } = useGetUserSelectedObject();
  return (
    <Container authHeader loading={isLoading}>
      {object && (
        <EditPropertyServicesSection
          id={object.id}
          initState={object.services}
        />
      )}
    </Container>
  );
}
