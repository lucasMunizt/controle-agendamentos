import { ArrowRight, Link } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
const cardsDadosEspecificos = () => {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Próximos agendamentos</CardTitle>
          <Button className="bg-blue-500" variant="link" size="sm">
            <Link className=" flex bg-red-500" to="/agendamentos">
              Ver todos <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nenhum agendamento futuro.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default cardsDadosEspecificos;
