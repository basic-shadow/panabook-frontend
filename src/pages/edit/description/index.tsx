import EditPropertyDescriptionPage from "@/components/editDescription/EditPropertyDescriptionPage";
import Container from "@/entities/container/container";
import React from "react";

export default function EditPropertyDescription() {
  return (
    <Container authHeader>
      <EditPropertyDescriptionPage />
    </Container>
  );
}
