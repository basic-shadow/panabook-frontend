import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import RatesOverviewSection from "@/components/ratesOverview/RatesOverviewSection";
import Container from "@/entities/container/container";
import React from "react";

export default function RatesOverviewPage() {
  const { object, isLoading } = useGetUserSelectedObject();

  return (
    <Container authHeader loading={isLoading}>
      {object && <RatesOverviewSection rooms={object.rooms} />}
    </Container>
  );
}
