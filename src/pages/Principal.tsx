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

  const garantias = [
    {
      id: 1,
      os: "001234",
      data: "2026-07-13",
      nome_cliente: "Maria Oliveira",
      aparelho: "iPhone 12 Pro",
      pecas: "Tela original + bateria",
      valor: 850.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-10",
      na_garantia: true,
    },
    {
      id: 2,
      os: "001235",
      data: "2026-07-14",
      nome_cliente: "João Carlos",
      aparelho: "Samsung Galaxy S21",
      pecas: "Conector de carga",
      valor: 180.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-12",
      na_garantia: true,
    },
    {
      id: 3,
      os: "001236",
      data: "2026-07-15",
      nome_cliente: "Ana Beatriz",
      aparelho: "Motorola Edge 30",
      pecas: "Tela frontal",
      valor: 420.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-13",
      na_garantia: true,
    },
    {
      id: 4,
      os: "001237",
      data: "2026-07-16",
      nome_cliente: "Pedro Henrique",
      aparelho: "iPhone 11",
      pecas: "Bateria",
      valor: 280.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-14",
      na_garantia: true,
    },
    {
      id: 5,
      os: "001238",
      data: "2026-07-17",
      nome_cliente: "Camila Santos",
      aparelho: "Xiaomi Redmi Note 12",
      pecas: "Tela + película",
      valor: 350.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-15",
      na_garantia: true,
    },
    {
      id: 6,
      os: "001239",
      data: "2026-07-18",
      nome_cliente: "Lucas Almeida",
      aparelho: "Samsung Galaxy A54",
      pecas: "Tampa traseira",
      valor: 160.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-16",
      na_garantia: true,
    },
    {
      id: 7,
      os: "001240",
      data: "2026-07-19",
      nome_cliente: "Fernanda Lima",
      aparelho: "iPhone XR",
      pecas: "Tela compatível",
      valor: 390.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-17",
      na_garantia: true,
    },
    {
      id: 8,
      os: "001241",
      data: "2026-07-20",
      nome_cliente: "Rafael Costa",
      aparelho: "Motorola G60",
      pecas: "Conector de carga + limpeza interna",
      valor: 220.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-18",
      na_garantia: true,
    },
    {
      id: 9,
      os: "001242",
      data: "2026-07-21",
      nome_cliente: "Patrícia Gomes",
      aparelho: "Samsung Galaxy M52",
      pecas: "Bateria + tampa traseira",
      valor: 310.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-19",
      na_garantia: true,
    },
    {
      id: 10,
      os: "001243",
      data: "2026-07-22",
      nome_cliente: "Bruno Martins",
      aparelho: "iPhone 13",
      pecas: "Tela original",
      valor: 950.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-20",
      na_garantia: true,
    },
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
        <div className="mt-4 grid *:grid-cols-1 gap-4 md:grid-cols-2">
          <CardsDadosEspecificos
            titulo="Próximos agendamentos"
            paragrafo="Nenhum agendamento futuro."
            dados={garantias}
          />
          <CardsDadosEspecificos
            titulo="Últimas garantias"
            paragrafo="Nenhuma garantia registrada."
            dados={garantias}
          />
        </div>
      </div>
    </div>
  );
};

export default Principal;
