import EditPropertyPoliciesSection from "@/components/editPolicies/EditPropertyPoliciesSection";
import { useGetUserSelectedObject } from "@/components/home/api/objectsQuery";
import Container from "@/entities/container/container";
import { type ObjectsInfo } from "@/server/objects/objects.types";
import React from "react";

const checkTimes = (object?: ObjectsInfo) => {
  if (!object) return;

  // 14:00:00 TO 14:00
  const checkInFrom = object.checkInFrom.split(":");
  const checkInTo = object.checkInTo.split(":");
  const checkOutFrom = object.checkOutFrom.split(":");
  const checkOutTo = object.checkOutTo.split(":");
  return {
    checkInTime: {
      from: checkInFrom[0] + ":" + checkInFrom[1],
      to: checkInTo[0] + ":" + checkInTo[1],
    },
    checkOutTime: {
      from: checkOutFrom[0] + ":" + checkOutFrom[1],
      to: checkOutTo[0] + ":" + checkOutTo[1],
    },
  };
};

export default function EditPropertyPoliciesPage() {
  const { object, isLoading } = useGetUserSelectedObject();

  return (
    <Container authHeader loading={isLoading}>
      {object && <EditPropertyPoliciesSection initState={checkTimes(object)} />}
    </Container>
  );
}
