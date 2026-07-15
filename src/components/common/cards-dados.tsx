import { Card, CardContent } from "../ui/card";

interface CardDadosProps {
  nome: string;
  valor: string;
  icone: React.ReactNode;
}
const cardsDados = ({ nome, valor, icone }: CardDadosProps) => {
  return (
    <div>
      <Card>
        <CardContent className="pt-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {nome}
            </p>
            {icone}
          </div>
          <p className="mt-2 text-[20px] font-semibold">{valor}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default cardsDados;
