import RoomsSection from "@/components/rooms/RoomsSection";
import Container from "@/entities/container/container";
import React from "react";

export default function RoomsPage() {
  return (
    <Container authHeader>
      <RoomsSection />
    </Container>
  );
}
