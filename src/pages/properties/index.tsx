import { useGetUserObjects } from "@/components/home/api/objectsQuery";
import UserPropertiesSection from "@/components/userProperties/UserPropertiesSection";
import Container from "@/entities/container/container";
import React from "react";

export default function UserPropertiesPage() {
  const { isLoading: objectsLoading, objects } = useGetUserObjects();

  return (
    <Container authHeader loading={objectsLoading}>
      <UserPropertiesSection />
    </Container>
  );
}
