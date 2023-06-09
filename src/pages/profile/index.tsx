import { useGetUser } from "@/components/admin/api/usersQuery";
import EditUserProfileSection from "@/components/editUserProfile/EditUserProfileSection";
import Container from "@/entities/container/container";
import React from "react";

export default function EditUserProfilePage() {
  const { user, isLoading } = useGetUser();

  return (
    <Container authHeader loading={isLoading}>
      {user && <EditUserProfileSection {...user} />}
    </Container>
  );
}
