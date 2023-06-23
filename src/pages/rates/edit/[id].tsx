import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import EditRateSection from "@/components/rates/EditRateSection";
import { useRouter as useLocation } from "next/router";
import Container from "@/entities/container/container";
import React from "react";
import { useRouter } from "next/navigation";
import { routeEndpoints } from "@/shared/routeEndpoint";
import { useGetAllRatesQuery } from "@/components/rates/api/useRatesQuery";

export default function EditRatePage() {
  const { object, isLoading } = useGetUserSelectedObject();
  const { data: rates, isLoading: ratesLoading } = useGetAllRatesQuery(
    object?.id
  );

  const { query } = useLocation();
  // router
  const router = useRouter();
  if (
    rates &&
    rates.find((rate) => +(query as { id: string }).id === rate.id) ===
      undefined
  ) {
    return router.push(routeEndpoints.home);
  }

  return (
    <Container authHeader loading={isLoading || ratesLoading}>
      {object && rates && (
        <EditRateSection
          objectId={object.id}
          roomPlans={object.rooms.map((room) => ({
            id: room.id,
            name: +room.roomName,
          }))}
        />
      )}
    </Container>
  );
}
