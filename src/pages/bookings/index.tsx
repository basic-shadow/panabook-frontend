import BookingsSection from "@/components/bookingsSection/BookingsSection";
import Container from "@/entities/container/container";
import React from "react";

export default function BookingsPage() {
  return (
    <Container authHeader>
      <BookingsSection />
    </Container>
  );
}
