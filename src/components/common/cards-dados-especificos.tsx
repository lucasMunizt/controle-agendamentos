import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import ModalDados from "./modal-dados";
type Agendamento = {
  id: string;
  cliente: string;
  telefone: string;
  servico: string;
  data: string;
  hora: string;
  observacoes?: string;
  status: "agendado" | "concluido" | "cancelado";
  createdAt: string;
};
interface DadosItem {
  id: number;
  nome_cliente: string;
  aparelho: string;
  data: string;
  hora?: string;
}
interface CardsDadosEspecificosProps {
  titulo: string;
  paragrafo: string;
  dados: DadosItem[];
  rota: string;
  abrir?: boolean;
  setAbrir?: (abrir: boolean) => void;
}
const cardsDadosEspecificos = ({
  titulo,
  paragrafo,
  dados,
  rota,
}: CardsDadosEspecificosProps) => {
  function formatarData(data: string) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}-${mes}-${ano}`;
  }
  const [agendamentoSelecionado, setAgendamentoSelecionado] =
    useState<Agendamento | null>(null);
  const [abrir, setAbrir] = useState(false);
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">{titulo}</CardTitle>
          <Button className="no-underline" variant="ghost" size="sm">
            <Link to={rota} className="flex items-center gap-1 no-underline">
              Ver todos <ArrowRight className="ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {dados.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              {paragrafo}
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {dados.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setAgendamentoSelecionado({
                        id: String(item.id),
                        cliente: item.nome_cliente,
                        telefone: "",
                        servico: item.aparelho,
                        data: item.data,
                        hora: item.hora ?? "",
                        observacoes: "",
                        status: "agendado",
                        createdAt: new Date().toISOString(),
                      });
                      setAbrir(true);
                    }}
                    className="flex w-full items-center justify-between py-3 text-left hover:bg-muted/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-black">
                        {item.nome_cliente}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {item.aparelho}
                      </p>
                    </div>

                    <div className="ml-4 shrink-0 text-right">
                      <p className="text-sm font-medium text-black">
                        {formatarData(item.data)}
                      </p>

                      {item.hora && (
                        <p className="text-xs text-muted-foreground">
                          {item.hora}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <ModalDados
            abrir={abrir}
            setAbrir={setAbrir}
            agendamento={agendamentoSelecionado}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default cardsDadosEspecificos;
