import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { User, Phone, Wrench, Calendar, Clock, MapPinned } from "lucide-react";
import { Row } from "./row";
import { FormatarData, FormateHoras } from "../../lib/format-date-hours";
import type { agendamentosTypes } from "../../lib/storage";

interface ModalDadosProps {
  abrir?: boolean;
  setAbrir?: (abrir: boolean) => void;
  agendamento?: agendamentosTypes | null;
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
                <span className="font-medium">{agendamento.titulo}</span>
              </div>
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
              value={agendamento.descricao}
            />

            <div className="grid grid-cols-2 gap-40">
              <Row
                icon={<Calendar className="h-4 w-4" />}
                label="Data"
                value={FormatarData(agendamento.data_inicio)}
              />
              <Row
                icon={<Clock className="h-4 w-4" />}
                label="Hora"
                value={FormateHoras(agendamento.data_inicio)}
              />
            </div>
            <Row
              icon={<MapPinned className="h-4 w-4" />}
              label="Endereço"
              value={agendamento.endereco}
            />

            {/* {agendamento.observacoes && (
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
            )} */}
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
