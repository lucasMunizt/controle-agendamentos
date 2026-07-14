import AppShell from "../components/common/app-shell";
import { Button } from "../components/ui/button";

const Agendamentos = () => {
  return (
    <div className="bg-[#F9FCFF]">
      <header className="bg-blue-600 mb-0">
        <AppShell />
      </header>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-semibold mb-1">Agendamentos</h1>
            <p className="text-muted-foreground">
              Gerencie os horários dos seus clientes
            </p>
          </div>
          <div>
            <Button className="bg-[#0072DA] mt-2 sm:mt-0" size={"lg"}>
              {" "}
              + Novo agendamento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agendamentos;
