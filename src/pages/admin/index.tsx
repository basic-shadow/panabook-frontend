import AdminSection from "@/components/admin/AdminSection";
import { useGetAllObjects } from "@/components/admin/api/adminObjectsQuery";
import Container from "@/entities/container/container";
import { routeEndpoints } from "@/shared/routeEndpoint";
import { type NextPage } from "next";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const limit = 20;

const AdminPage: NextPage = () => {
  const [page, setPage] = useState(1);
  const {
    isLoading: objectsLoading,
    objects,
    error,
  } = useGetAllObjects({ page, limit });
  const router = useRouter();

  const fetchNextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  useEffect(() => {
    if (error !== null && objectsLoading === false) {
      router.push(routeEndpoints.login);
    }
  }, [error, objectsLoading]);

  return (
    <Container authHeader loading={objectsLoading}>
      <AdminSection
        objects={objects}
        objectsLoading={objectsLoading}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  );
};

export default AdminPage;
