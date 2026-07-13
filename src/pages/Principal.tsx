import AppShell from "../components/common/app-shell";
import {
  Calendar,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";
import CardsDados from "../components/common/cards-dados";
import CardsDadosEspecificos from "../components/common/cards-dados-especificos";
const Principal = () => {
  const dados = [
    { label: "Agendamentos ativos", valor: 10, icone: Calendar },
    { label: "Garantias emitidas", valor: 10, icone: ShieldCheck },
    { label: "Concluídos", valor: 10, icone: Clock },
    { label: "Valor em garantias", valor: 1000.0, icone: TrendingUp },
  ];
  return (
    <div className="bg-[#F9FCFF]">
      <header className="bg-blue-600 mb-0">
        <AppShell />
      </header>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="">
          <h1 className="text-4xl font-semibold mb-1">Painel</h1>
          <p className="text-muted-foreground">
            Visão geral dos seus agendamentos e garantias
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-4 ">
          {dados.map((item) => {
            const Icon = item.icone;
            return (
              <div key={item.label} className=" ">
                <CardsDados
                  nome={item.label}
                  valor={item.valor.toString()}
                  icone={<Icon className="h-4 w-4 text-muted-foreground" />}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <CardsDadosEspecificos />
        </div>
      </div>
    </div>
  );
};

export default Principal;
