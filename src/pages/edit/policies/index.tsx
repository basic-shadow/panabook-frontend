import EditPropertyPoliciesPage from "@/components/editPolicies/EditPropertyPoliciesPage";
import Container from "@/entities/container/container";
import React from "react";

export default function EditPropertyServices() {
  return (
    <Container removeHeader>
      <EditPropertyPoliciesPage />
    </Container>
  );
}
