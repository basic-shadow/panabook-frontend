import LoginForm from "@/components/login/login-form";
import Container from "@/entities/container/container";
import Image from "next/image";
import bgImg from "@/assets/images/login.jpeg";

export default function LoginPage() {
  return (
    <Container title="Panabook - Войти в аккаунт">
      <main className="relative min-h-screen">
        <Image
          src={bgImg}
          alt="alt"
          className="absolute h-screen object-cover"
        />
        <div className="absolute top-0 left-0 h-screen w-full bg-white/10 backdrop-blur-sm backdrop-brightness-95"></div>
        <LoginForm />
      </main>
    </Container>
  );
}
