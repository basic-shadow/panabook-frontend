import HomePage from "@/components/home/HomePage";
import { useGetObjects } from "@/components/home/api/useGetObjects";
import Container from "@/entities/container/container";
import SpinnerLoader from "@/shared/UI/SpinnerLoader/SpinnerLoader";
import { routeEndpoints } from "@/shared/routeEndpoint";
import { type NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home: NextPage = () => {
  // const { isLoading: objectsLoading, objects, error } = useGetObjects();
  const router = useRouter();

  // useEffect(() => {
  //   if (error) {
  //     router.push(routeEndpoints.login);
  //   }
  // }, [error]);

  useEffect(() => {
    router.push(routeEndpoints.success);
  }, []);

  return (
    <Container>
      {/* {objectsLoading ? <SpinnerLoader /> : <div>objects</div>}
      <HomePage objects={objects} /> */}
    </Container>
  );
};

export default Home;
