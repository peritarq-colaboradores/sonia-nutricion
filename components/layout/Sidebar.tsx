"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  FileText,
  LogOut,
  Leaf,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard",  label: "Inicio",    icon: LayoutDashboard, exact: true },
  { href: "/pacientes",  label: "Pacientes", icon: Users },
  { href: "/recetas",    label: "Recetas",   icon: BookOpen },
  { href: "/planes",     label: "Planes",    icon: Calendar },
  { href: "/informes",   label: "Informes",  icon: FileText },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full w-64 bg-white border-r border-warm-100 flex flex-col z-30 shadow-sm transition-transform duration-200",
        // Desktop: siempre visible. Móvil: visible solo si isOpen
        "md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      {/* Logo / Marca */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-warm-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sage-500 flex items-center justify-center shadow-sm">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-warm-900 text-sm leading-tight">Sonia Nutrición</p>
            <p className="text-xs text-warm-400 leading-tight">Herramienta profesional</p>
          </div>
        </div>
        {/* Cerrar en móvil */}
        <button
          className="md:hidden w-7 h-7 flex items-center justify-center rounded-lg text-warm-400 hover:text-warm-600"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navegación principal */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                active
                  ? "bg-sage-500 text-white shadow-sm"
                  : "text-warm-600 hover:bg-warm-100 hover:text-warm-900"
              )}
            >
              <item.icon
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  active ? "text-white" : "text-warm-400 group-hover:text-warm-600"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
            </Link>
          );
        })}
      </nav>

      {/* Acciones rápidas */}
      <div className="px-3 py-3 border-t border-warm-100 space-y-0.5">
        <div className="px-3 py-2 rounded-xl">
          <p className="text-xs font-medium text-warm-400 uppercase tracking-wider mb-2">
            Acceso rápido
          </p>
          <div className="space-y-0.5">
            <Link
              href="/pacientes/nuevo"
              onClick={onClose}
              className="flex items-center gap-2 text-xs text-warm-500 hover:text-sage-600 py-1 transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              Nuevo paciente
            </Link>
            <Link
              href="/recetas/nueva"
              onClick={onClose}
              className="flex items-center gap-2 text-xs text-warm-500 hover:text-sage-600 py-1 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Nueva receta
            </Link>
          </div>
        </div>
      </div>

      {/* Perfil / Salir */}
      <div className="px-4 py-4 border-t border-warm-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center">
            <span className="text-xs font-semibold text-sage-700">SN</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-warm-800 truncate">Sonia</p>
            <p className="text-xs text-warm-400 truncate">Dietista-Nutricionista</p>
          </div>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-2 text-xs text-warm-400 hover:text-red-500 transition-colors py-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  );
}
