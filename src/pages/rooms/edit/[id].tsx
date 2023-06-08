import EditRoomInfoSection from "@/components/editRooms/EditRoomInfoSection";
import Container from "@/entities/container/container";
import { useRouter as useLocation } from "next/router";
import React from "react";

export default function EditRoomInfoPage() {
  const { query } = useLocation();

  return (
    <Container authHeader>
      <EditRoomInfoSection
        id={(query as { id: string }).id}
        initState={undefined}
      />
    </Container>
  );
}
