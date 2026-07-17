import { Plus, Search } from "lucide-react";
import AppShell from "../components/common/app-shell";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useEffect, useState } from "react";
import CardsDadosEspecificos from "../components/common/cards-dados-especificos";
import z from "zod";
import type { garantiasTypes } from "../lib/storage";
import { FormatarMoeda } from "../lib/format-date-hours";
import ModalGarantia from "../components/common/modal-garantia";
import { getGarantias } from "../service/GetAgendamentos";
type TipoGarantia = {
  noventaDias: string;
  sessenta: string;
};
type FormState = {
  os: string;
  nome: string;
  aparelho: string;
  pecas: string;
  valor: number;
  data: string;
  tipo: TipoGarantia;
};
const Garantias = () => {
  const [abrir, setAbrir] = useState(false);
  const [query, setQuery] = useState("");
  const [abrirModal, setAbrirModal] = useState(false);
  const [garantias, setGarantias] = useState<garantiasTypes[]>([]);
  useEffect(() => {
    async function fetchGarantias() {
      try {
        const data = await getGarantias();
        setGarantias(Array.isArray(data) ? data : []);
        // setAgendamentos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao mostrar os dados");
      }
    }
    fetchGarantias();
  }, []);

  const tiposGarantias = ["90 Dias", "06 Meses", "01 Ano"];
  const schema = z.object({
    os: z.string().trim().min(1, "Informe a OS").max(30),
    nome: z.string().trim().min(1, "Informe o nome do cliente").max(120),
    aparelho: z.string().trim().min(1, "Informe o aparelho").max(120),
    pecas: z.string().trim().min(1, "Informe as peças").max(500),
    valor: z.coerce.number().min(0, "Valor inválido"),
    data: z.string().min(1, "Selecione a data"),
    tipo: z.enum(["90dias", "6meses", "1ano"]),
  });

  const empty: FormState = {
    os: "",
    nome: "",
    aparelho: "",
    pecas: "",
    valor: 0,
    data: "",
    tipo: "90dias",
  };

  type FormState = z.input<typeof schema>;

  const [form, setForm] = useState<FormState>(empty);
  return (
    <div className="min-h-screen bg-[#F9FCFF]">
      <AppShell />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* Cabeçalho da página */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="mb-1 text-4xl font-semibold">Garantias</h1>

            <p className="text-sm text-muted-foreground">
              Registre garantias de 90 dias, 6 meses ou 1 ano. A validade é
              calculada automaticamente.
            </p>
          </div>

          <Button
            className="gap-2 bg-[#0072DA] hover:bg-[#1684ec]"
            size="lg"
            onClick={() => setAbrirModal(true)}
          >
            <Plus className="h-4 w-4" />
            Nova garantia
          </Button>
        </div>

        {/* Busca */}
        <div className="relative mt-6 w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Buscar por cliente ou aparelho"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 pl-9"
          />
        </div>

        {/* Lista */}
        <div className="mt-6 w-full">
          <CardsDadosEspecificos<garantiasTypes>
            titulo="Últimas garantias"
            paragrafo="Nenhuma garantia registrada."
            valorBusca={query}
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

        {/* Modal */}
        <Dialog open={abrirModal} onOpenChange={setAbrirModal}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Criar garantia</DialogTitle>

              <DialogDescription>
                Preencha os dados para registrar uma nova garantia.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="os">OS</Label>
                <Input
                  id="os"
                  value={form.os}
                  onChange={(e) => setForm({ ...form, os: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="aparelho">Aparelho</Label>
                <Input
                  id="aparelho"
                  value={form.aparelho}
                  onChange={(e) =>
                    setForm({ ...form, aparelho: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="valor">Valor</Label>
                <Input
                  id="valor"
                  type="number"
                  value={form.valor}
                  onChange={(e) => setForm({ ...form, valor: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  type="datetime-local"
                  value={form.data}
                  onChange={(e) => setForm({ ...form, data: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pecas">Tipo de garantia</Label>

                <select
                  id="pecas"
                  value={form.pecas}
                  onChange={(e) => setForm({ ...form, pecas: e.target.value })}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecione a garantia</option>

                  {tiposGarantias.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setAbrirModal(false)}>
                Cancelar
              </Button>

              <Button className="bg-[#0072DA] hover:bg-[#2d87dc]">
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Garantias;
