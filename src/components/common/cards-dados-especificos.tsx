import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FormatarData, FormateHoras } from "../../lib/format-date-hours";

interface CardsDadosEspecificosProps<T> {
  titulo: string;
  paragrafo: string;
  dados: T[];
  valorBusca?: string;
  rota: string;
  opcao: boolean;
  limite?: number;

  // acessores: cada uso define como extrair os dados do seu tipo
  getId: (item: T) => string;
  getTitulo: (item: T) => string;
  getDescricao: (item: T) => string;
  getData: (item: T) => string; // usada pra ordenar e formatar
  getCamposBusca?: (item: T) => string[]; // campos extras pra busca, ex: [titulo, descricao]

  // renderiza o modal específico daquele uso (agendamento ou garantia)
  renderModal: (item: T | null, abrir: boolean, setAbrir: (v: boolean) => void) => React.ReactNode;
}

function CardsDadosEspecificos<T>({
  titulo,
  paragrafo,
  dados,
  rota,
  valorBusca,
  opcao,
  limite,
  getId,
  getTitulo,
  getDescricao,
  getData,
  getCamposBusca,
  renderModal,
}: CardsDadosEspecificosProps<T>) {
  const [itemSelecionado, setItemSelecionado] = useState<T | null>(null);
  const [abrir, setAbrir] = useState(false);

  const normalizeTexto = (valor: string) =>
    valor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const busca = normalizeTexto(valorBusca ?? "");

  const dadosFiltrados = dados.filter((item) => {
    if (!busca) return true;
    const campos = getCamposBusca
      ? getCamposBusca(item)
      : [getTitulo(item), getDescricao(item)];
    return campos.some((campo) => normalizeTexto(campo ?? "").includes(busca));
  });

  const dadosExibidos = [...(busca ? dadosFiltrados : dados)].sort(
    (a, b) => new Date(getData(b)).getTime() - new Date(getData(a)).getTime(),
  );

  const dadosParaMostrar =
    limite !== undefined ? dadosExibidos.slice(0, limite) : dadosExibidos;

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">{titulo}</CardTitle>
          {opcao && (
            <Button className="no-underline" variant="ghost" size="sm">
              <Link to={rota} className="flex items-center gap-1 no-underline">
                Ver todos <ArrowRight className="ml-1" />
              </Link>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {dadosParaMostrar.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              {paragrafo}
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {dadosParaMostrar.map((item) => (
                <li key={getId(item)}>
                  <button
                    type="button"
                    onClick={() => {
                      setItemSelecionado(item);
                      setAbrir(true);
                    }}
                    className="flex w-full items-center justify-between py-3 text-left hover:bg-muted/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-black">
                        {getTitulo(item)}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {getDescricao(item)}
                      </p>
                    </div>
                    <div className="ml-4 shrink-0 text-right">
                      <p className="text-sm font-medium text-black">
                        {FormatarData(getData(item))}
                      </p>
                      {getData(item) && (
                        <p className="text-xs text-muted-foreground">
                          {FormateHoras(getData(item))}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {renderModal(itemSelecionado, abrir, setAbrir)}
        </CardContent>
      </Card>
    </div>
  );
}

export default CardsDadosEspecificos;