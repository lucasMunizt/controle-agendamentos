import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  ShieldCheck,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";
const appShell = () => {
  const nav = [
    { to: "/", label: "Painel", icon: LayoutDashboard },
    { to: "/agendamentos", label: "Agendamentos", icon: Calendar },
    { to: "/garantias", label: "Garantias", icon: ShieldCheck },
    { to: "/ordens-servico", label: "Ordens de Serviço", icon: Settings },
  ];
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-[#F9FCFF]">
      {/* css do header para linha da bordar */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-[#F9FCFF] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link
            to="/"
            className="text-lg font-semibold flex items-center gap-2"
          >
            {/* icone do header com as iniciais */}
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-primary-foreground font-bold">
              {/* {(empresa.nome || "?").charAt(0).toUpperCase()} */}C
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">
                {" "}
                Clv asssitência técnica
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                Gestão de serviços
              </p>
            </div>
          </Link>
          {/* navegação dos itens */}
          <nav className="hidden gap-1 md:flex">
            {nav.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#D8EEFF] text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 gap-4 flex" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default appShell;
