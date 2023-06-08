import EditPropertyPoliciesPage from "@/components/editPolicies/EditPropertyPoliciesPage";
import Container from "@/entities/container/container";
import React from "react";

export default function EditPropertyServices() {
  return (
    <Container authHeader>
      <EditPropertyPoliciesPage
        initState={{
          checkInTime: { from: "00:00", to: "00:00" },
          checkOutTime: { from: "00:00", to: "00:00" },
        }}
      />
    </Container>
  );
}
