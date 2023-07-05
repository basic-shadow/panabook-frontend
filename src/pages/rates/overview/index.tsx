import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import { useGetAllRatesQuery } from "@/components/rates/api/useRatesQuery";
import RatesOverviewSection from "@/components/ratesOverview/RatesOverviewSection";
import Container from "@/entities/container/container";
import React from "react";

export default function RatesOverviewPage() {
  const { object, isLoading } = useGetUserSelectedObject();
  // RATES
  const { data: ratesData, isLoading: ratesLoading } = useGetAllRatesQuery(
    object?.id
  );

  return (
    <Container authHeader loading={isLoading || ratesLoading}>
      {object && ratesData && (
        <RatesOverviewSection rooms={object.rooms} rates={ratesData} />
      )}
    </Container>
  );
}
