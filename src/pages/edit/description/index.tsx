import EditPropertyDescriptionSection from "@/components/editDescription/EditPropertyDescriptionSection";
import Container from "@/entities/container/container";
import React from "react";

export default function EditPropertyDescriptionPage() {
  return (
    <Container authHeader>
      <EditPropertyDescriptionSection />
    </Container>
  );
}
