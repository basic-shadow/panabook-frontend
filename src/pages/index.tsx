import HomePage from "@/components/home/HomePage";
import { useGetObjects } from "@/components/home/api/useGetObjects";
import Container from "@/entities/container/container";
import { routeEndpoints } from "@/shared/routeEndpoint";
import { type NextPage } from "next";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const limit = 20;

const Home: NextPage = () => {
  const [page, setPage] = useState(1);
  const {
    isLoading: objectsLoading,
    objects,
    error,
  } = useGetObjects({ page, limit });
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
      <HomePage
        objects={objects}
        objectsLoading={objectsLoading}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  );
};

export default Home;
