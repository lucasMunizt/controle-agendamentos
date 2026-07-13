import {
  Calendar,
  ShieldCheck,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Link, useLocation } from "react-router-dom";

interface DrawerMenuProps {
  abrir: boolean;
  setAbrir: (abrir: boolean) => void;
}

const DrawerMenu = ({ abrir, setAbrir }: DrawerMenuProps) => {
  const nav = [
    { to: "/", label: "Painel", icon: LayoutDashboard },
    { to: "/agendamentos", label: "Agendamentos", icon: Calendar },
    { to: "/garantias", label: "Garantias", icon: ShieldCheck },
    { to: "/ordens-servico", label: "Ordens de Serviço", icon: Settings },
  ];
  const { pathname } = useLocation();
  return (
    <div>
      <Drawer swipeDirection="down" open={abrir} onOpenChange={setAbrir}>
        <DrawerContent>
          <DrawerClose>
            {/* <Button className="w-1 flex items-end" variant="outline">
              X
            </Button> */}
          </DrawerClose>
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerDescription>
              Selecione uma opção do menu para navegar.
            </DrawerDescription>
          </DrawerHeader>
          <nav className="flex flex-col gap-2">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-[12px] font-medium transition-colors sm:text-[10px] md:text-sm ${
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
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerMenu;
