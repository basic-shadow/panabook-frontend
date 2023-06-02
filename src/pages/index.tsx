import HomePage from "@/components/home/HomePage";
import { useGetUserObjects } from "@/components/home/api/objectsQuery";
import Container from "@/entities/container/container";
import { type NextPage } from "next";
import { useRouter } from "next/navigation";

const Home: NextPage = () => {
  const { isLoading: objectsLoading, objects, error } = useGetUserObjects();
  const router = useRouter();

  return (
    <Container removeHeader loading={objectsLoading}>
      <HomePage />
    </Container>
  );
};

export default Home;
