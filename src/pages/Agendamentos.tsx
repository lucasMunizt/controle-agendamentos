import { Plus, Search } from "lucide-react";
import AppShell from "../components/common/app-shell";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";
import CardsDadosEspecificos from "../components/common/cards-dados-especificos";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

import { z } from "zod";
import { Label } from "../components/ui/label";

const Agendamentos = () => {
  const [query, setQuery] = useState("");
  const garantias = [
    {
      id: 1,
      os: "001234",
      data: "2026-07-13",
      hora: "14:40",
      nome_cliente: "Maria Oliveira",
      aparelho: "iPhone 12 Pro",
      pecas: "Tela original + bateria",
      valor: 850.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-10",
      na_garantia: true,
    },
    {
      id: 2,
      os: "001235",
      data: "2026-07-13",
      nome_cliente: "João Carlos",
      aparelho: "Samsung Galaxy S21",
      pecas: "Conector de carga",
      valor: 180.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-12",
      na_garantia: true,
    },
    {
      id: 3,
      os: "001236",
      data: "2026-07-13",
      nome_cliente: "Ana Beatriz",
      aparelho: "Motorola Edge 30",
      pecas: "Tela frontal",
      valor: 420.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-13",
      na_garantia: true,
    },
    {
      id: 4,
      os: "001237",
      data: "2026-07-16",
      nome_cliente: "Pedro Henrique",
      aparelho: "iPhone 11",
      pecas: "Bateria",
      valor: 280.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-14",
      na_garantia: true,
    },
    {
      id: 5,
      os: "001238",
      data: "2026-07-17",
      nome_cliente: "Camila Santos",
      aparelho: "Xiaomi Redmi Note 12",
      pecas: "Tela + película",
      valor: 350.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-15",
      na_garantia: true,
    },
    {
      id: 6,
      os: "001239",
      data: "2026-07-18",
      nome_cliente: "Lucas Almeida",
      aparelho: "Samsung Galaxy A54",
      pecas: "Tampa traseira",
      valor: 160.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-16",
      na_garantia: true,
    },
    {
      id: 7,
      os: "001240",
      data: "2026-07-19",
      nome_cliente: "Fernanda Lima",
      aparelho: "iPhone XR",
      pecas: "Tela compatível",
      valor: 390.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-17",
      na_garantia: true,
    },
    {
      id: 8,
      os: "001241",
      data: "2026-07-20",
      nome_cliente: "Rafael Costa",
      aparelho: "Motorola G60",
      pecas: "Conector de carga + limpeza interna",
      valor: 220.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-18",
      na_garantia: true,
    },
    {
      id: 9,
      os: "001242",
      data: "2026-07-21",
      nome_cliente: "Patrícia Gomes",
      aparelho: "Samsung Galaxy M52",
      pecas: "Bateria + tampa traseira",
      valor: 310.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-19",
      na_garantia: true,
    },
    {
      id: 10,
      os: "001243",
      data: "2026-07-22",
      nome_cliente: "Bruno Martins",
      aparelho: "iPhone 13",
      pecas: "Tela original",
      valor: 950.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-20",
      na_garantia: true,
    },
    {
      id: 11,
      os: "001234",
      data: "2026-07-13",
      hora: "14:40",
      nome_cliente: "Maria Oliveira",
      aparelho: "iPhone 12 Pro",
      pecas: "Tela original + bateria",
      valor: 850.0,
      tipo_garantia: "90 dias",
      validade_ate: "2026-10-10",
      na_garantia: true,
    },
  ];
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

  const [form, setForm] = useState<FormState>(empty);

  return (
    <div className="bg-[#F9FCFF]">
      <header className="bg-blue-600 mb-0">
        <AppShell />
      </header>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-semibold mb-1">Agendamentos</h1>
            <p className="text-muted-foreground">
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
          <CardsDadosEspecificos
            titulo="Próximos agendamentos"
            paragrafo="Nenhum agendamento futuro."
            dados={garantias}
            rota="/agendamentos"
            abrir={abrir}
            setAbrir={setAbrir}
            valorBusca={query}
            opcao={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Agendamentos;
