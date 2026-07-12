import {
  Calendar,
  ShieldCheck,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";

const DrawerMenu = () => {
  const nav = [
    { to: "/", label: "Painel", icon: LayoutDashboard },
    { to: "/agendamentos", label: "Agendamentos", icon: Calendar },
    { to: "/garantias", label: "Garantias", icon: ShieldCheck },
    { to: "/ordens-servico", label: "Ordens de Serviço", icon: Settings },
  ];
  return <div>drawer-menu</div>;
};

export default DrawerMenu;
