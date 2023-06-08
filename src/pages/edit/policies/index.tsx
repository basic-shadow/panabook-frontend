import EditPropertyPoliciesSection from "@/components/editPolicies/EditPropertyPoliciesSection";
import Container from "@/entities/container/container";
import React from "react";

export default function EditPropertyPoliciesPage() {
  return (
    <Container authHeader>
      <EditPropertyPoliciesSection
        initState={{
          checkInTime: { from: "00:00", to: "00:00" },
          checkOutTime: { from: "00:00", to: "00:00" },
        }}
      />
    </Container>
  );
}
