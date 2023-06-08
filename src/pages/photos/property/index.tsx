import PropertyPhotosSection from "@/components/propertyPhotos/PropertyPhotosSection";
import Container from "@/entities/container/container";
import React from "react";

export default function PropertyPhotosPage() {
  return (
    <Container authHeader>
      <PropertyPhotosSection />
    </Container>
  );
}
