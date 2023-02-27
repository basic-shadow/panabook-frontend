import SignupForm from "@/components/signup/signup-form";
import Container from "@/entities/container/container";
import { type NextPage } from "next";
import Image from "next/image";
import bgImg from "@/assets/images/join.jpeg";

const SignupPage: NextPage = () => {
  return (
    <Container title="Panabook - Добавить отель">
      <main className="relative min-h-screen">
        <Image
          src={bgImg}
          alt="alt"
          className="absolute h-screen object-cover"
        />
        <div className="absolute top-0 left-0 h-screen w-full bg-white/10 backdrop-blur-sm backdrop-brightness-95"></div>
        <SignupForm />
      </main>
    </Container>
  );
};

export default SignupPage;
