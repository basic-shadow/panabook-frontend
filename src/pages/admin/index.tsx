import AdminPage from "@/components/admin/AdminPage";
import { useGetAllObjects } from "@/components/admin/api/adminObjectsQuery";
import Container from "@/entities/container/container";
import { routeEndpoints } from "@/shared/routeEndpoint";
import { type NextPage } from "next";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const limit = 20;

const Admin: NextPage = () => {
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
    <Container removeHeader loading={objectsLoading}>
      <AdminPage
        objects={objects}
        objectsLoading={objectsLoading}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  );
};

export default Admin;
