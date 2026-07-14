import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

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
                <li
                  key={item.id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{item.nome_cliente}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.aparelho}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatarData(item.data)}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.hora}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default cardsDadosEspecificos;
