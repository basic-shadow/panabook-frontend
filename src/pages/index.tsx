import HomeSection from "@/components/home/HomeSection";
import Container from "@/entities/container/container";
import { type NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <Container authHeader>
      <HomeSection />
    </Container>
  );
};

export default HomePage;
