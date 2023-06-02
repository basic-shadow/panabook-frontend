import UserPropertiesPage from "@/components/userProperties/UserPropertiesPage";
import Container from "@/entities/container/container";
import React from "react";

export default function UserProperties() {
  return (
    <Container removeHeader>
      <UserPropertiesPage />
    </Container>
  );
}
