import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import PropertyPhotosSection from "@/components/propertyPhotos/PropertyPhotosSection";
import Container from "@/entities/container/container";
import React from "react";

export default function PropertyPhotosPage() {
  const { object, isLoading } = useGetUserSelectedObject();
  return (
    <Container authHeader loading={isLoading}>
      {object && <PropertyPhotosSection photosUrl={object.imageUrls} />}
    </Container>
  );
}
