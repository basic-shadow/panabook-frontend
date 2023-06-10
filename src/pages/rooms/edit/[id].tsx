import EditRoomInfoSection from "@/components/editRooms/EditRoomInfoSection";
import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import Container from "@/entities/container/container";
import { useRouter as useLocation } from "next/router";
import React from "react";
import { useRouter } from "next/navigation";
import { routeEndpoints } from "@/shared/routeEndpoint";

export default function EditRoomInfoPage() {
  const { object, isLoading } = useGetUserSelectedObject();
  const { query } = useLocation();
  // router
  const router = useRouter();
  if (object && object.rooms[+(query as { id: string }).id - 1] === undefined) {
    return router.push(routeEndpoints.home);
  }

  return (
    <Container authHeader loading={isLoading || !object}>
      {object && (
        <EditRoomInfoSection
          initState={object.rooms[+(query as { id: string }).id - 1]!}
        />
      )}
    </Container>
  );
}
