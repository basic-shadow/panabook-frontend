import EditPropertyServicesSection from "@/components/editServices/EditPropertyServicesSection";
import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import Container from "@/entities/container/container";
import { normalizeStringToArrayNumber } from "@/shared/utils/normalizePropertyValues";
import React from "react";

export default function EditPropertyServicesPage() {
  const { object, isLoading } = useGetUserSelectedObject();

  return (
    <Container authHeader loading={isLoading}>
      {object && (
        <EditPropertyServicesSection
          initState={normalizeStringToArrayNumber(object.services)}
        />
      )}
    </Container>
  );
}
