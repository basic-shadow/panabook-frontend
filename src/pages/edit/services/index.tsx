import EditPropertyServicesPage from "@/components/editServices/EditPropertyServicesPage";
import Container from "@/entities/container/container";
import React from "react";

export default function EditPropertyServices() {
  return (
    <Container authHeader>
      <EditPropertyServicesPage initState={[]} />
    </Container>
  );
}
