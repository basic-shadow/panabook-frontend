import RatesSection from "@/components/rates/RatesSection";
import Container from "@/entities/container/container";
import React from "react";

export default function RatesPage() {
  return (
    <Container authHeader>
      <RatesSection />
    </Container>
  );
}
