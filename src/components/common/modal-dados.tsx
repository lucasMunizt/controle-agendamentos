import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { User, Phone, Wrench, Calendar, Clock, FileText } from "lucide-react";
import { Separator } from "../ui/separator";
import { Row } from "./row";

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
interface ModalDadosProps {
  abrir?: boolean;
  setAbrir?: (abrir: boolean) => void;
  agendamento?: Agendamento | null;
}
const ModalDados = ({ abrir, setAbrir, agendamento }: ModalDadosProps) => {
  return (
    <Dialog open={abrir} onOpenChange={setAbrir}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalhes do agendamento</DialogTitle>
          <DialogDescription>
            Informações completas do agendamento selecionado.
          </DialogDescription>
        </DialogHeader>

        {agendamento ? (
          <div className="grid gap-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{agendamento.cliente}</span>
              </div>
              {agendamento.status}
            </div>

            {agendamento.telefone && (
              <Row
                icon={<Phone className="h-4 w-4" />}
                label="Telefone"
                value={agendamento.telefone}
              />
            )}

            <Row
              icon={<Wrench className="h-4 w-4" />}
              label="Serviço"
              value={agendamento.servico}
            />

            <div className="grid grid-cols-2 gap-4">
              <Row
                icon={<Calendar className="h-4 w-4" />}
                label="Data"
                value={agendamento.data}
              />
              <Row
                icon={<Clock className="h-4 w-4" />}
                label="Hora"
                value={agendamento.hora}
              />
            </div>

            {agendamento.observacoes && (
              <>
                <Separator />
                <div className="grid gap-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    Observações
                  </div>
                  <p className="text-sm whitespace-pre-wrap">
                    {agendamento.observacoes}
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Nenhum agendamento selecionado.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalDados;
