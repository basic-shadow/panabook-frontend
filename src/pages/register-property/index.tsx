import RegisterPropertyForm from "@/components/registerProperty/register_property_form";
import Container from "@/entities/container/container";

export default function RegisterPropertyPage() {
  return (
    <Container title="Panabook - Добавить отель">
      <main className="min-h-screen bg-slate-200">
        <div className="flex items-center justify-center py-12">
          <RegisterPropertyForm />
        </div>
      </main>
    </Container>
  );
}
