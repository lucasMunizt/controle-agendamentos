import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { User, Smartphone, Puzzle, Calendar, DollarSign } from "lucide-react";
import { Row } from "./row";
import { FormatarData, FormatarMoeda } from "../../lib/format-date-hours";
import type { garantiasTypes } from "../../lib/storage";

interface ModalGarantiaProps {
  abrir?: boolean;
  setAbrir?: (abrir: boolean) => void;
  garantia?: garantiasTypes | null;
}

const ModalGarantia = ({ abrir, setAbrir, garantia }: ModalGarantiaProps) => {
  return (
    <Dialog open={abrir} onOpenChange={setAbrir}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalhes da garantia</DialogTitle>
          <DialogDescription>
            Informações completas da garantia selecionada.
          </DialogDescription>
        </DialogHeader>

        {garantia ? (
          <div className="grid gap-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{garantia.nome}</span>
              </div>
            </div>

            <Row
              icon={<Smartphone className="h-4 w-4" />}
              label="Aparelho"
              value={garantia.aparelho}
            />

            <Row
              icon={<Puzzle className="h-4 w-4" />}
              label="Peças"
              value={garantia.pecas}
            />

            <div className="grid grid-cols-2 gap-40">
              <Row
                icon={<Calendar className="h-4 w-4" />}
                label="Data"
                value={FormatarData(garantia.data)}
              />
              <Row
                icon={<DollarSign className="h-4 w-4" />}
                label="Valor"
                value={FormatarMoeda(garantia.valor)}
              />
            </div>
          </div>
        ) : (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Nenhuma garantia selecionada.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalGarantia;
