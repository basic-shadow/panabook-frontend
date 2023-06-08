import RatesOverviewSection from "@/components/ratesOverview/RatesOverviewSection";
import Container from "@/entities/container/container";
import React from "react";

export default function RatesOverviewPage() {
  return (
    <Container authHeader>
      <RatesOverviewSection />
    </Container>
  );
}
