import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import Container from "@/entities/container/container";
import { useRouter as useLocation } from "next/router";
import React from "react";
import { useRouter } from "next/navigation";
import { routeEndpoints } from "@/shared/routeEndpoint";
import RoomPhotosSection from "@/components/roomPhotos/RoomPhotosSection";

export default function SingleRoomPhotos() {
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
        <RoomPhotosSection
          roomName={+object.rooms[+(query as { id: string }).id - 1]!.roomName}
          photos={object.rooms[+(query as { id: string }).id - 1]?.images || []}
          roomId={object.rooms[+(query as { id: string }).id - 1]!.id}
        />
      )}
    </Container>
  );
}
