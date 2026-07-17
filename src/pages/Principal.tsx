import AppShell from "../components/common/app-shell";
import { Calendar, ShieldCheck, TrendingUp, Clock } from "lucide-react";
import CardsDados from "../components/common/cards-dados";
import CardsDadosEspecificos from "../components/common/cards-dados-especificos";
import { useEffect, useState } from "react";
import { getAgendamentos, getGarantias } from "../service/GetAgendamentos";
import { FormatarData, FormatarMoeda } from "../lib/format-date-hours";
import type { agendamentosTypes, garantiasTypes } from "../lib/storage";
import ModalDados from "../components/common/modal-dados";
import ModalGarantia from "../components/common/modal-garantia";

const Principal = () => {
  const [garantias, setGarantias] = useState<garantiasTypes[]>([]);
  const [agendamentos, setAgendamentos] = useState<agendamentosTypes[]>([]);
  let totalGarantias = 0;
  let valorTotalGarantias = 0;
  let atendimentosConcluidos = 0;
  const dataAtual = new Date();
  const mesAtual = new Date().getMonth();
  const anoAtual = new Date().getFullYear();
  const diaAtual = new Date().toLocaleDateString("sv-SE");
  useEffect(() => {
    async function fetchAgendamentos() {
      try {
        const data = await getAgendamentos();
        // setGarantias(Array.isArray(data) ? data : []);
        setAgendamentos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao mostrar os dados");
      }
    }
    async function fetchGarantias() {
      try {
        const data = await getGarantias();
        setGarantias(Array.isArray(data) ? data : []);
        // setAgendamentos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao mostrar os dados");
      }
    }
    fetchAgendamentos();
    fetchGarantias();
  }, []);

  // filtro mes, comprado mês e ano
  const garantiasDoMes = garantias.filter((item) => {
    const dataGarantias = new Date(item.data);

    return (
      dataGarantias.getMonth() === mesAtual &&
      dataGarantias.getFullYear() === anoAtual
    );
  });

  //filtro dia para saber quantos atendimentos foram feitos naquele dia
  const garantiasGeradasNoDia = garantias.filter((item) => {
    return FormatarData(item.data) === FormatarData(diaAtual);
  });
  //Quantidade de serviços concluidos apartir de quandas garantias geradas no dia
  atendimentosConcluidos = garantiasGeradasNoDia.length;

  // filtro para saber quandos agendamentos ativos no dia
  const filtroAgendamentos = agendamentos.filter((item) => {
    const data = new Date(item.data_inicio);
    return data >= dataAtual;
  });

  // total de atendimentos agendados
  const atendimentosAtivos = filtroAgendamentos.length;

  // total de garantias
  totalGarantias = garantiasDoMes.length;
  // //soma de todas as garantias do mes
  valorTotalGarantias = garantiasDoMes.reduce(
    (total, item) => item.valor + total,
    0,
  );

  const CardResume = [
    {
      nome: "Atendimentos ativos",
      valor: atendimentosAtivos,
      icone: Calendar,
      descricao: "Agendamentos em aberto",
    },
    {
      nome: "Garantias emitidas",
      valor: totalGarantias,
      icone: ShieldCheck,
      descricao: "Garantias cadastradas",
    },
    {
      nome: "Concluídos",
      valor: atendimentosConcluidos,
      icone: Clock,
      descricao: "Serviços finalizados",
    },
    {
      nome: "Valor em garantias",
      valor: FormatarMoeda(valorTotalGarantias),
      icone: TrendingUp,
      descricao: "Soma total das garantias",
    },
  ];

  return (
    <div className="bg-[#F9FCFF]">
      <header className="bg-blue-600 mb-0">
        <AppShell />
      </header>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="">
          <h1 className="text-4xl font-semibold mb-1">Painel</h1>
          <p className="text-muted-foreground">
            Visão geral dos seus agendamentos e garantias
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-4 ">
          {CardResume.map((item) => {
            const Icon = item.icone;
            return (
              <div key={item.nome} className=" ">
                <CardsDados
                  nome={item.nome}
                  valor={item.valor.toString()}
                  icone={<Icon className="h-4 w-4 text-muted-foreground" />}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-4 grid *:grid-cols-1 gap-4 md:grid-cols-2">
          <CardsDadosEspecificos<agendamentosTypes>
            titulo="Próximos agendamentos"
            paragrafo="Nenhum agendamento futuro."
            dados={filtroAgendamentos}
            rota="/agendamentos"
            opcao={true}
            limite={5}
            getId={(item) => String(item.id)}
            getTitulo={(item) => item.titulo}
            getDescricao={(item) => item.descricao}
            getData={(item) => item.data_inicio}
            renderModal={(item, abrir, setAbrir) => (
              <ModalDados
                abrir={abrir}
                setAbrir={setAbrir}
                agendamento={item}
              />
            )}
          />
          <CardsDadosEspecificos<garantiasTypes>
            titulo="Últimas garantias"
            paragrafo="Nenhuma garantia registrada."
            dados={garantias}
            rota="/garantias"
            opcao={true}
            getId={(item) => String(item.id)}
            getTitulo={(item) => item.nome /* ajuste ao campo real */}
            getDescricao={(item) => FormatarMoeda(item.valor)}
            getData={(item) => item.data}
            renderModal={(item, abrir, setAbrir) => (
              <ModalGarantia
                abrir={abrir}
                setAbrir={setAbrir}
                garantia={item}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Principal;
