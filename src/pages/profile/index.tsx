import EditUserProfilePage from "@/components/editUserProfile/EditUserProfilePage";
import Container from "@/entities/container/container";
import React from "react";

export default function EditUserProfile() {
  return (
    <Container authHeader>
      <EditUserProfilePage />
    </Container>
  );
}
