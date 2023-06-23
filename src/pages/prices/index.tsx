import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import PricesSection from "@/components/prices/PricesSection";
import { useGetAllRatesQuery } from "@/components/rates/api/useRatesQuery";
import Container from "@/entities/container/container";
import React from "react";

export default function PricesPage() {
  const { object, isLoading } = useGetUserSelectedObject();
  // RATES
  const { data: rates, isLoading: ratesLoading } = useGetAllRatesQuery(
    object?.id
  );

  return (
    <Container authHeader loading={isLoading || ratesLoading}>
      {object && rates && <PricesSection rates={rates} rooms={object.rooms} />}
    </Container>
  );
}
