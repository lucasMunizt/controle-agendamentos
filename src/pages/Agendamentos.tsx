import { Plus, Search } from "lucide-react";
import AppShell from "../components/common/app-shell";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";
import CardsDadosEspecificos from "../components/common/cards-dados-especificos";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import { z } from "zod";
import { Label } from "../components/ui/label";
import { getAgendamentos } from "../service/GetAgendamentos";
import type { agendamentosTypes } from "../lib/storage";
import ModalDados from "../components/common/modal-dados";

const Agendamentos = () => {
  const [query, setQuery] = useState("");
  const [agendamentos, setAgendamentos] = useState<agendamentosTypes[]>([]);
  useEffect(() => {
    async function fetchLotes() {
      try {
        const data = await getAgendamentos();
        setAgendamentos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao mostrar os dados");
      }
    }
    fetchLotes();
  }, []);
  const aparelhos = [
    "Maquina de lavar Consul",
    "Maquina de lavar Brastemp",
    "Maquina de lavar Electrolux",
    "Geladeira Consul",
    "Geladeira Brastemp",
    "Geladeira Electrolux ",
  ];
  const [abrir, setAbrir] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);
  // console.log("query ", query);
  const schema = z.object({
    cliente: z.string().trim().min(1, "Informe o cliente").max(120),
    telefone: z.string().trim().max(30).optional().default(""),
    servico: z.string().trim().min(1, "Selecione o aparelho").max(200),
    endereco: z.string().trim().min(1, "Informe o endereço").max(200),
    dataHora: z.string().min(1, "Selecione a data e hora"),
    observacoes: z.string().max(500).optional().default(""),
    status: z.enum(["agendado", "concluido", "cancelado"]),
  });
  const empty: FormState = {
    cliente: "",
    telefone: "",
    servico: "",
    endereco: "",
    dataHora: "",
    observacoes: "",
    status: "agendado",
  };
  type FormState = z.input<typeof schema>;
  const dataAtual = new Date();
  const [form, setForm] = useState<FormState>(empty);
  const filtroAgendamentos = agendamentos.filter((item) => {
    const dataAgendamento = new Date(item.data_inicio);
    return dataAgendamento >= dataAtual;
  });
  return (
    <div className="bg-[#F9FCFF]">
      <header className="mb-0">
        <AppShell />
      </header>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-semibold mb-1">Agendamentos</h1>
            <p className="text-muted-foreground text-[12px]">
              Gerencie os horários dos seus clientes
            </p>
          </div>
          <div>
            <Button
              className="bg-[#0072DA] flex gap-2 mt-2 sm:mt-0 hover:bg-[#1684ec]"
              size={"lg"}
              onClick={() => {
                setAbrirModal(true);
              }}
            >
              {" "}
              <Plus className="mr-2 h-4 w-4" /> Novo agendamento
            </Button>
            <Dialog open={abrirModal} onOpenChange={setAbrirModal}>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Criar agendamento</DialogTitle>
                  <DialogDescription>Crie seu agendamento</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="cliente">Nome</Label>
                    <Input
                      id="cliente"
                      value={form.cliente}
                      onChange={(e) =>
                        setForm({ ...form, cliente: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={form.telefone}
                      onChange={(e) =>
                        setForm({ ...form, telefone: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      value={form.endereco}
                      onChange={(e) =>
                        setForm({ ...form, endereco: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="aparelho">Aparelho</Label>
                    <select
                      id="aparelho"
                      value={form.servico}
                      onChange={(e) =>
                        setForm({ ...form, servico: e.target.value })
                      }
                      className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Selecione um aparelho</option>

                      {aparelhos.map((aparelho) => (
                        <option key={aparelho} value={aparelho}>
                          {aparelho}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="data">Data</Label>
                    <Input
                      id="data"
                      type="datetime-local"
                      value={form.dataHora}
                      onChange={(e) =>
                        setForm({ ...form, dataHora: e.target.value })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setAbrirModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button className="bg-[#0072DA] hover:bg-[#2d87dc]">
                    Salvar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mb-4 py-4 relative max-w-sm">
          <Search className="absolute left-3 ml-1.5 top-1/2 h-4 w-4 -translate-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente ou serviço"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <div>
          <CardsDadosEspecificos<agendamentosTypes>
            titulo="Próximos agendamentos"
            paragrafo="Nenhum agendamento futuro."
            dados={filtroAgendamentos}
            valorBusca={query}
            rota="/agendamentos"
            opcao={true}
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
        </div>
      </div>
    </div>
  );
};

export default Agendamentos;
