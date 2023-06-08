import RoomPhotosSection from "@/components/roomPhotos/RoomPhotosSection";
import Container from "@/entities/container/container";
import React from "react";

export default function RoomPhotosPage() {
  return (
    <Container authHeader>
      <RoomPhotosSection />
    </Container>
  );
}
