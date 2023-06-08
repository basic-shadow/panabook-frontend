import HomePage from "@/components/home/HomePage";
import Container from "@/entities/container/container";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Container authHeader>
      <HomePage />
    </Container>
  );
};

export default Home;
