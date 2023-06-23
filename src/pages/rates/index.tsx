import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import RatesSection from "@/components/rates/RatesSection";
import Container from "@/entities/container/container";
import React from "react";

export default function RatesPage() {
  const { object, isLoading } = useGetUserSelectedObject();

  return (
    <Container authHeader loading={isLoading}>
      {object && <RatesSection id={object.id} />}
    </Container>
  );
}
